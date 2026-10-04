#!/usr/bin/env python3
"""
Builds src/data/osaka-areas.json, the map on the home page (置き場所), from real boundaries:
国土数値情報（行政区域データ）, 国土交通省 (令和7年1月1日時点). That data is made from the survey results
of 国土地理院 (GSI) and follows the boundaries on GSI maps.

Get the data (GeoJSON inside each zip) into tools/osaka-map/data/ and run:  python3 tools/osaka-map/build.py
  https://nlftp.mlit.go.jp/ksj/gml/data/N03/N03-2025/N03-20250101_27_GML.zip   (大阪府)
  ... and _26 (京都府), _28 (兵庫県), _29 (奈良県), _30 (和歌山県), _25 (滋賀県), _24 (三重県) for the land around it.

How the lines are found: neighboring areas share the exact same points along their common border.
Every border segment is counted once per area that uses it; a segment used by two areas is a border
between them (municipality, ward or prefecture, depending on who the two are). Lines are drawn once,
so both sides of a border always match.
"""
import json
import math
from collections import defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA = HERE / "data"
OUT = HERE.parent.parent / "src" / "data" / "osaka-areas.json"

# same projection as src/data/osaka-map.ts: x = lon * cos(34.65°) * 1000, y = -lat * 1000
COS = math.cos(math.radians(34.65))
SCALE = 1000
def project(lon, lat):
    return (lon * COS * SCALE, -lat * SCALE)

# how far a simplified line may stray from the real one, in map units (1 unit ≈ 111 m; the map shows ~2 units per pixel)
TOL_OSAKA = 0.7
TOL_AROUND = 2.0
MIN_AREA = 0.6  # drop specks smaller than this (≈ 0.007 km²)


def load(code):
    path = next(DATA.glob(f"N03-*_{code}.geojson"))
    return json.loads(path.read_text(encoding="utf-8"))["features"]


def rings_of(geom):
    polys = [geom["coordinates"]] if geom["type"] == "Polygon" else geom["coordinates"]
    for poly in polys:
        for i, ring in enumerate(poly):
            yield i == 0, ring


def area(pts):
    return abs(sum(x0 * y1 - x1 * y0 for (x0, y0), (x1, y1) in zip(pts, pts[1:] + pts[:1]))) / 2


def simplify(pts, tol):
    """Douglas–Peucker, iterative."""
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        (ax, ay), (bx, by) = pts[a], pts[b]
        dx, dy = bx - ax, by - ay
        ln = math.hypot(dx, dy) or 1e-12
        best, idx = 0.0, -1
        for i in range(a + 1, b):
            px, py = pts[i]
            d = abs(dy * px - dx * py + bx * ay - by * ax) / ln if (dx or dy) else math.hypot(px - ax, py - ay)
            if d > best:
                best, idx = d, i
        if best > tol and idx > 0:
            keep[idx] = True
            stack += [(a, idx), (idx, b)]
    return [p for p, k in zip(pts, keep) if k]


def simplify_ring(ring, tol):
    # split the closed ring at its farthest point so both halves keep their ends
    if len(ring) < 4:
        return ring
    far = max(range(len(ring)), key=lambda i: (ring[i][0] - ring[0][0]) ** 2 + (ring[i][1] - ring[0][1]) ** 2)
    a = simplify(ring[: far + 1], tol)
    b = simplify(ring[far:] + [ring[0]], tol)
    return a[:-1] + b[:-1]


ORIGIN = [0.0, 0.0]  # paths are written relative to the top-left of the view, to keep the numbers short


def num(v):
    t = f"{v:.1f}".rstrip("0").rstrip(".")
    return "0" if t in ("-0", "") else t


def rel(pts, close):
    """M x y then relative l steps (much shorter than absolute coordinates)."""
    ox, oy = ORIGIN
    q = [(round((x - ox) * 10), round((y - oy) * 10)) for x, y in pts]  # 0.1 units
    out = [f"M{num(q[0][0] / 10)} {num(q[0][1] / 10)}"]
    steps = []
    for (x0, y0), (x1, y1) in zip(q, q[1:]):
        if (x0, y0) == (x1, y1):
            continue
        dx, dy = num((x1 - x0) / 10), num((y1 - y0) / 10)
        steps.append(dx + ("" if dy.startswith("-") else " ") + dy)
    out.append("l" + " ".join(steps) if steps else "")
    return "".join(out).replace(" -", "-") + ("z" if close else "")


def d_of(rings):
    return "".join(rel(ring, True) for ring in rings if len(ring) >= 3)


def d_lines(lines):
    return "".join(rel(line, False) for line in lines if len(line) >= 2)


def chain(segments):
    """Join loose segments (pairs of points) into as few polylines as possible."""
    nbrs = defaultdict(list)
    for a, b in segments:
        nbrs[a].append(b)
        nbrs[b].append(a)
    used = set()
    lines = []
    def walk(start, nxt):
        line = [start, nxt]
        used.add(frozenset((start, nxt)))
        cur, prev = nxt, start
        while True:
            options = [p for p in nbrs[cur] if frozenset((cur, p)) not in used]
            if len(nbrs[cur]) != 2 or not options:
                break
            prev, cur = cur, options[0]
            used.add(frozenset((prev, cur)))
            line.append(cur)
        return line
    # start at ends and junctions first, then whatever loops remain
    for node in [n for n in nbrs if len(nbrs[n]) != 2] + list(nbrs):
        for nxt in nbrs[node]:
            if frozenset((node, nxt)) not in used:
                lines.append(walk(node, nxt))
    return lines


def rings_from(segments):
    """Closed outlines from boundary segments. Every point has an even number of segments, so walking
    from any segment and always taking an unused one leads back to the start (also where an outline
    touches itself)."""
    nbrs = defaultdict(list)
    for a, b in segments:
        nbrs[a].append(b)
        nbrs[b].append(a)
    used = set()
    rings = []
    for a, b in segments:
        if frozenset((a, b)) in used:
            continue
        ring, prev, cur = [a], a, b
        used.add(frozenset((a, b)))
        while cur != a:
            ring.append(cur)
            nxt = next((p for p in nbrs[cur] if frozenset((cur, p)) not in used), None)
            if nxt is None:
                break
            used.add(frozenset((cur, nxt)))
            prev, cur = cur, nxt
        if cur == a and len(ring) >= 3:
            rings.append(ring)
    return rings


def main():
    osaka = load(27)
    # 京都・兵庫・奈良・和歌山, and 滋賀・三重 at the edges of the view
    around = {code: load(code) for code in (26, 28, 29, 30, 25, 24)}

    # every area: (prefecture, municipality, ward) and its rings in lon/lat
    areas = []
    for code, feats in [(27, osaka)] + list(around.items()):
        for f in feats:
            p = f["properties"]
            name = p.get("N03_004") or p.get("N03_003") or ""
            ward = p.get("N03_005") or ""
            areas.append({"pref": code, "city": name, "ward": ward, "rings": [r for _, r in rings_of(f["geometry"])]})

    # who uses each border segment
    users = defaultdict(set)
    for i, a in enumerate(areas):
        for ring in a["rings"]:
            pts = [tuple(p) for p in ring]
            for s, t in zip(pts, pts[1:]):
                if s != t:
                    users[frozenset((s, t))].add(i)

    seg = {"city": [], "ward": [], "pref": []}
    for key, who in users.items():
        if len(who) != 2:
            continue
        i, j = sorted(who)
        A, B = areas[i], areas[j]
        if A["pref"] != B["pref"]:
            kind = "pref"
        elif A["pref"] != 27:
            continue  # borders inside the neighboring prefectures are not drawn
        elif A["city"] == B["city"]:
            kind = "ward"
        else:
            kind = "city"
        s, t = tuple(key)
        seg[kind].append((project(*s), project(*t)))

    # the visible window: Osaka with room on the left for the label, as in Location.astro
    oxs = [project(*p)[0] for a in areas if a["pref"] == 27 for r in a["rings"] for p in r]
    oys = [project(*p)[1] for a in areas if a["pref"] == 27 for r in a["rings"] for p in r]
    bx0, bx1, by0, by1 = min(oxs), max(oxs), min(oys), max(oys)
    padx, pady = (bx1 - bx0) * 0.42, (by1 - by0) * 0.06
    view = [bx0 - padx, by0 - pady, bx1 - bx0 + padx * 2, by1 - by0 + pady * 2]
    ORIGIN[:] = view[:2]
    vx0, vy0, vx1, vy1 = view[0] - 5, view[1] - 5, view[0] + view[2] + 5, view[1] + view[3] + 5
    inside = lambda pts: any(vx0 <= x <= vx1 and vy0 <= y <= vy1 for x, y in pts)

    # Osaka: one shape per municipality, or per ward in Osaka City and Sakai City
    shapes = defaultdict(list)
    for a in areas:
        if a["pref"] != 27:
            continue
        for ring in a["rings"]:
            pts = [project(*p) for p in ring[:-1]]
            if area(pts) < MIN_AREA:
                continue
            shapes[(a["city"], a["ward"])].append(simplify_ring(pts, TOL_OSAKA))
    out_areas = []
    for (city, ward), rings in sorted(shapes.items()):
        big = max(rings, key=area)
        cx = sum(x for x, _ in big) / len(big)
        cy = sum(y for _, y in big) / len(big)
        out_areas.append({"city": city, "ward": ward, "d": d_of(rings), "c": [round(cx - ORIGIN[0], 1), round(cy - ORIGIN[1], 1)], "a": round(sum(area(r) for r in rings), 1)})

    # the land around Osaka: each neighboring prefecture as one outline (segments its own areas use once)
    land = []
    for code in around:
        count = defaultdict(int)
        for a in areas:
            if a["pref"] != code:
                continue
            for ring in a["rings"]:
                pts = [tuple(p) for p in ring]
                for s_, t_ in zip(pts, pts[1:]):
                    if s_ != t_:
                        count[frozenset((s_, t_))] += 1
        outline = [tuple(k) for k, n in count.items() if n == 1]
        for ring in rings_from(outline):
            pts = [project(*p) for p in ring]
            if not inside(pts) or area(pts) < MIN_AREA * 4:
                continue
            land.append(simplify_ring(pts, TOL_AROUND))

    lines = {}
    for kind, tol in (("city", TOL_OSAKA), ("ward", TOL_OSAKA), ("pref", TOL_AROUND)):
        chained = [simplify(l, tol) for l in chain(seg[kind])]
        lines[kind] = d_lines([l for l in chained if inside(l)])

    result = {
        "source": "国土数値情報（行政区域データ）国土交通省（令和7年1月1日時点）を加工して作成。原典は国土地理院の測量成果。",
        "view": [0, 0, round(view[2], 1), round(view[3], 1)],
        "origin": [round(view[0], 1), round(view[1], 1)],
        "areas": out_areas,
        "land": d_of(land),
        "lines": lines,
    }
    OUT.write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"{len(out_areas)} areas, {OUT.stat().st_size // 1024} KB -> {OUT}")


if __name__ == "__main__":
    main()

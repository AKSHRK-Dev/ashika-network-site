/**
 * 大阪府の地図（トップページ「置き場所」）。
 *
 * 形は国土数値情報（行政区域データ、国土交通省、令和7年1月1日時点）から作っている。原典は国土地理院の
 * 測量成果で、地理院地図と同じ行政界になる。市町村と、大阪市・堺市の区の境界まで実際のとおり。
 * データは tools/osaka-map/build.py が src/data/osaka-areas.json に書き出す（作り直し方もそこに書いてある）。
 *
 * 座標は osaka-areas.json の view の左上を原点にした図の座標（右がx＋、下がy＋、1＝緯度0.001度≒111m）。
 */
import data from './osaka-areas.json';

export type LonLat = readonly [number, number];

export const map = data as {
  source: string;
  view: [number, number, number, number];
  origin: [number, number];
  areas: { city: string; ward: string; d: string; c: [number, number]; a: number }[];
  land: string;
  lines: { city: string; ward: string; pref: string };
};

/** 緯度による横の縮みを補正するための基準の緯度（大阪のまんなかあたり）。build.py と同じ値 */
const COS = Math.cos((34.65 * Math.PI) / 180);
const SCALE = 1000;

/** 経緯度を図の座標に直す */
export function project([lon, lat]: LonLat): [number, number] {
  return [lon * COS * SCALE - map.origin[0], -lat * SCALE - map.origin[1]];
}

/** 市の名前を置く位置（区がある市は、区の中心を面積で重み付けして平均する） */
export function cityCenter(city: string): [number, number] {
  const parts = map.areas.filter((a) => a.city === city);
  const total = parts.reduce((s, a) => s + a.a, 0) || 1;
  return [parts.reduce((s, a) => s + a.c[0] * a.a, 0) / total, parts.reduce((s, a) => s + a.c[1] * a.a, 0) / total];
}

/** 図に置く文字 */
export const labels: readonly { text: string; at: LonLat; tone: 'land' | 'sea' }[] = [
  { text: '兵庫県', at: [135.10, 34.97], tone: 'land' },
  { text: '京都府', at: [135.63, 34.985], tone: 'land' },
  { text: '奈良県', at: [135.86, 34.60], tone: 'land' },
  { text: '和歌山県', at: [135.33, 34.28], tone: 'land' },
  { text: '大阪湾', at: [135.19, 34.52], tone: 'sea' },
  { text: '淡路島', at: [134.90, 34.40], tone: 'sea' },
];

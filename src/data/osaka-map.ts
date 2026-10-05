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

/** 図に置く文字（en は英語版の表記） */
export const labels: readonly { text: string; en: string; at: LonLat; tone: 'land' | 'sea' }[] = [
  { text: '兵庫県', en: 'Hyogo', at: [135.10, 34.97], tone: 'land' },
  { text: '京都府', en: 'Kyoto', at: [135.63, 34.985], tone: 'land' },
  { text: '奈良県', en: 'Nara', at: [135.86, 34.60], tone: 'land' },
  { text: '和歌山県', en: 'Wakayama', at: [135.33, 34.28], tone: 'land' },
  { text: '大阪湾', en: 'Osaka Bay', at: [135.19, 34.52], tone: 'sea' },
  { text: '淡路島', en: 'Awaji Island', at: [134.90, 34.40], tone: 'sea' },
];

/**
 * 英語版で出す市町村と区の名前（地図にマウスを載せたときの名前に使う）。
 * osaka-areas.json の名前（国土数値情報の表記）をそのまま見出しにしている。
 */
const romaji: Record<string, string> = {
  交野市: 'Katano', 八尾市: 'Yao', 千早赤阪村: 'Chihayaakasaka', 吹田市: 'Suita', 和泉市: 'Izumi',
  四條畷市: 'Shijonawate', 堺市: 'Sakai', 大東市: 'Daito', 大阪市: 'Osaka', 大阪狭山市: 'Osakasayama',
  太子町: 'Taishi', 守口市: 'Moriguchi', 富田林市: 'Tondabayashi', 寝屋川市: 'Neyagawa', 岬町: 'Misaki',
  岸和田市: 'Kishiwada', 島本町: 'Shimamoto', 忠岡町: 'Tadaoka', 摂津市: 'Settsu', 東大阪市: 'Higashiosaka',
  松原市: 'Matsubara', 枚方市: 'Hirakata', 柏原市: 'Kashiwara', 池田市: 'Ikeda', 河内長野市: 'Kawachinagano',
  河南町: 'Kanan', 泉佐野市: 'Izumisano', 泉南市: 'Sennan', 泉大津市: 'Izumiotsu', 熊取町: 'Kumatori',
  田尻町: 'Tajiri', 箕面市: 'Minoh', 羽曳野市: 'Habikino', 能勢町: 'Nose', 茨木市: 'Ibaraki',
  藤井寺市: 'Fujiidera', 豊中市: 'Toyonaka', 豊能町: 'Toyono', 貝塚市: 'Kaizuka', 門真市: 'Kadoma',
  阪南市: 'Hannan', 高槻市: 'Takatsuki', 高石市: 'Takaishi',
  中区: 'Naka', 中央区: 'Chuo', 住之江区: 'Suminoe', 住吉区: 'Sumiyoshi', 北区: 'Kita', 南区: 'Minami',
  城東区: 'Joto', 堺区: 'Sakai', 大正区: 'Taisho', 天王寺区: 'Tennoji', 平野区: 'Hirano', 旭区: 'Asahi',
  東住吉区: 'Higashisumiyoshi', 東区: 'Higashi', 東成区: 'Higashinari', 東淀川区: 'Higashiyodogawa',
  此花区: 'Konohana', 浪速区: 'Naniwa', 淀川区: 'Yodogawa', 港区: 'Minato', 生野区: 'Ikuno',
  福島区: 'Fukushima', 美原区: 'Mihara', 西区: 'Nishi', 西成区: 'Nishinari', 西淀川区: 'Nishiyodogawa',
  都島区: 'Miyakojima', 阿倍野区: 'Abeno', 鶴見区: 'Tsurumi',
};

/** 市町村（と区）の表示名。英語では「Kita, Osaka」の形にする */
export function placeName(city: string, ward: string, lang: 'ja' | 'en'): string {
  if (lang === 'ja') return `${city}${ward}`;
  const c = romaji[city] ?? city;
  return ward ? `${romaji[ward] ?? ward}, ${c}` : c;
}

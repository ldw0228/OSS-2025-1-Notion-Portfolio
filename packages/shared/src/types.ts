export type PortfolioItem = {
  id: string;
  name: string;
  ticker: string;        // 야후 포맷 권장 (예: AAPL, 005930.KS)
  exchange?: string;     // KOSPI/KOSDAQ 등 (선택)
  shares: number;        // > 0
  avgBuyPrice: number;   // > 0 (원화/달러 등 현지 통화)
  currency: string;      // 예: USD, KRW
};

export type Quote = {
  symbol: string;
  last: number | null;
  currency?: string | null;
  ts: number | null;     // epoch ms
  source: 'yahoo' | 'alpha' | 'mock';
};

export type FxRate = {
  pair: string;          // "USD/KRW"
  rate: number;          // 1 from = rate to
  ts: number;            // epoch ms
  provider: string;      // exchangerate.host 등
};

export type TreemapNode = {
  id: string;
  symbol: string;
  name: string;
  price: number | null;  // 기준통화 환산 단가
  invested: number;      // Shares * AvgBuyPrice(기준통화)
  value: number;         // Shares * price(기준통화, 불명시 0)
  pnl: number;           // value - invested
  returnPct: number | null;
  area: number;          // Treemap 면적에 사용(= invested)
  currencyBase: string;  // 기준통화
  warnings?: string[];
};

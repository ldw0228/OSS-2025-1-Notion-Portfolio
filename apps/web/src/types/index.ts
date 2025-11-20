export interface StockData {
  id: string;
  ticker: string;
  name: string;
  shares: number;
  averagePrice: number;
  currentPrice: number;
  investmentAmount: number; // 투자금액 = shares * averagePrice
  currentValue: number; // 현재가치 = shares * currentPrice
  returnAmount: number; // 수익금액
  returnRate: number; // 수익률 (%)
  sector?: string;
}

export interface NotionPortfolioData {
  ticker: string;
  name: string;
  shares: number;
  averagePrice: number;
  sector?: string;
}

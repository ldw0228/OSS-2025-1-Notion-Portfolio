import YahooFinance from 'yahoo-finance2';

export interface StockPrice {
    ticker: string;
    currentPrice: number;
    currency: string;
}

// 인스턴스 생성 (v3 이상 필수)
const yahooFinance = new YahooFinance();

export const getStockPrices = async (tickers: string[]): Promise<StockPrice[]> => {
    if (tickers.length === 0) return [];

    try {
        /**
         * yahooFinance.quote( symbols[] )
         * → 여러 티커 전달 시 배열 반환
         */
        const results = await yahooFinance.quote(tickers);

        const quotes = Array.isArray(results) ? results : [results];

        return quotes.map((quote: any) => ({
            ticker: quote.symbol ?? '',
            currentPrice: quote.regularMarketPrice ?? 0,
            currency: quote.currency ?? 'USD',
        }));
    } catch (error) {
        console.error('Error fetching stock prices:', error);
        return [];
    }
};
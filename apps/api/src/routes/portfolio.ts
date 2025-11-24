import { Router } from 'express';
import { getPortfolioFromNotion } from '../services/notion.service';
import { getStockPrices } from '../services/yahoo.service';

export const portfolioRouter = Router();

portfolioRouter.get('/', async (req, res) => {
    try {
        const portfolioItems = await getPortfolioFromNotion();
        const tickers = portfolioItems.map(item => item.ticker);
        const prices = await getStockPrices(tickers);

        const priceMap = new Map(prices.map(p => [p.ticker, p]));

        const enrichedPortfolio = portfolioItems.map(item => {
            const priceData = priceMap.get(item.ticker);
            const rawCurrentPrice = priceData?.currentPrice || 0;
            const currency = priceData?.currency || 'USD';

            // KRW to USD conversion (fixed rate: 1 USD = 1400 KRW)
            const USD_KRW_RATE = 1400;
            const isKRW = currency === 'KRW';

            const currentPrice = isKRW ? rawCurrentPrice / USD_KRW_RATE : rawCurrentPrice;
            const averagePrice = isKRW ? item.averagePrice / USD_KRW_RATE : item.averagePrice;

            const investmentAmount = item.shares * averagePrice;
            const currentValue = item.shares * currentPrice;
            const returnAmount = currentValue - investmentAmount;
            const returnRate = investmentAmount > 0 ? (returnAmount / investmentAmount) * 100 : 0;

            // Detailed calculation logging
            console.log(`${item.name} (${item.ticker}):`, {
                currency,
                isKRW,
                rawCurrentPrice,
                currentPrice: currentPrice.toFixed(2),
                rawAveragePrice: item.averagePrice,
                averagePrice: averagePrice.toFixed(2),
                shares: item.shares,
                investmentAmount: investmentAmount.toFixed(2),
                currentValue: currentValue.toFixed(2),
                returnAmount: returnAmount.toFixed(2),
                returnRate: `${returnRate.toFixed(2)}%`
            });

            return {
                ...item,
                averagePrice, // Use converted average price
                currentPrice,
                currency: 'USD', // All values are now in USD
                investmentAmount,
                currentValue,
                returnAmount,
                returnRate,
            };
        });

        res.json(enrichedPortfolio);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        if (error instanceof Error) {
            console.error('Stack:', error.stack);
        }
        res.status(500).json({ error: 'Failed to fetch portfolio data', details: error instanceof Error ? error.message : 'Unknown error' });
    }
});

import { Card, CardContent } from './ui/card';
import type { StockData } from '../types';

interface PortfolioStatsProps {
    stockData: StockData[];
}

export function PortfolioStats({ stockData }: PortfolioStatsProps) {
    // 총 투자금액
    const totalInvestment = stockData.reduce(
        (sum, stock) => sum + stock.investmentAmount,
        0
    );

    // 총 평가금액
    const totalValue = stockData.reduce(
        (sum, stock) => sum + stock.currentValue,
        0
    );

    // 총 수익금액
    const totalReturn = totalValue - totalInvestment;

    // 총 수익률
    const totalReturnRate =
        totalInvestment > 0 ? (totalReturn / totalInvestment) * 100 : 0;

    // 수익 종목 수
    const profitableStocks = stockData.filter(
        (stock) => stock.returnRate > 0
    ).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 통계 카드가 들어갈 자리 */}
        </div>
    );
}

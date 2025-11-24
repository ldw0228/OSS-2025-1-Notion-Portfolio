import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
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

    const stats = [
        {
            label: '총 투자금액',
            value: `$${totalInvestment.toLocaleString()}`,
            icon: DollarSign,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            label: '총 평가금액',
            value: `$${totalValue.toLocaleString()}`,
            icon: PieChart,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
        },
        {
            label: '총 수익/손실',
            value: `${totalReturn >= 0 ? '+' : ''}$${totalReturn.toLocaleString()}`,
            icon: totalReturn >= 0 ? TrendingUp : TrendingDown,
            color: totalReturn >= 0 ? 'text-green-600' : 'text-red-600',
            bgColor: totalReturn >= 0 ? 'bg-green-50' : 'bg-red-50',
        },
        {
            label: '수익률',
            value: `${totalReturnRate >= 0 ? '+' : ''}${totalReturnRate.toFixed(2)}%`,
            subValue: `수익 종목: ${profitableStocks}/${stockData.length}`,
            icon: totalReturnRate >= 0 ? TrendingUp : TrendingDown,
            color: totalReturnRate >= 0 ? 'text-green-600' : 'text-red-600',
            bgColor: totalReturnRate >= 0 ? 'bg-green-50' : 'bg-red-50',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 통계 카드가 들어갈 자리 */}
        </div>
    );
}

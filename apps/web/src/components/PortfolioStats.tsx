import { Card, CardContent } from './ui/card';
import type { StockData } from '../types';

interface PortfolioStatsProps {
    stockData: StockData[];
}

export function PortfolioStats({ stockData }: PortfolioStatsProps) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 통계 카드가 들어갈 자리 */}
        </div>
    );
}

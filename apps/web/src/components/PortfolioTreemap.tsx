import React from 'react';
import { ResponsiveContainer, Treemap } from 'recharts';
import { PortfolioItem } from '../hooks/usePortfolio';

export const PortfolioTreemap: React.FC<{ stockData: PortfolioItem[] }> = ({ stockData }) => {
    return (
        <div style={{ width: '100%', height: 500 }}>
            <ResponsiveContainer width="100%" height="100%">
                <Treemap data={stockData as any} dataKey="currentValue" stroke="#fff" fill="#8884d8" />
            </ResponsiveContainer>
        </div>
    );
};

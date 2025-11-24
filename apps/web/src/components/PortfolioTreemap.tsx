import React from 'react';
import { ResponsiveContainer, Treemap } from 'recharts';
import { PortfolioItem } from '../hooks/usePortfolio';



const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, colors, name, returnRate, currentValue } = props;

  // Safety check: if returnRate is undefined (e.g. non-leaf node or missing data), don't render text
  if (typeof returnRate !== 'number') return null;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: returnRate >= 0 ? '#4caf50' : '#f44336', // Green for profit, Red for loss
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {width > 50 && height > 50 ? (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
        >
          {name}
        </text>
      ) : null}
      {width > 50 && height > 50 ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 18}
          textAnchor="middle"
          fill="#fff"
          fontSize={12}
        >
          {returnRate.toFixed(2)}%
        </text>
      ) : null}
    </g>
  );
};
export const PortfolioTreemap: React.FC<{ stockData: PortfolioItem[] }> = ({ stockData }) => {
  return (
    <div style={{ width: '100%', height: 500 }}>
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={stockData as any}
          dataKey="currentValue"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
          content={<CustomizedContent />}
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import type { StockData } from '../types';

interface PortfolioTreemapProps {
  stockData: StockData[];
}

interface TreemapNode {
  name: string;
  size: number;
  returnRate: number;
  ticker: string;
  currentValue: number;
  returnAmount: number;
  shares: number;
  currentPrice: number;
}

export function PortfolioTreemap({ stockData }: PortfolioTreemapProps) {
  // Treemap 데이터 구조로 변환
  const treemapData = stockData.map((stock) => ({
    name: stock.name,
    size: stock.investmentAmount,
    returnRate: stock.returnRate,
    ticker: stock.ticker,
    currentValue: stock.currentValue,
    returnAmount: stock.returnAmount,
    shares: stock.shares,
    currentPrice: stock.currentPrice,
  }));

  // 수익률에 따른 색상 결정 함수
  const getColor = (returnRate: number): string => {
    if (returnRate >= 10) return '#16a34a'; // 진한 초록 (10% 이상)
    if (returnRate >= 5) return '#22c55e'; // 초록 (5~10%)
    if (returnRate >= 0) return '#86efac'; // 연한 초록 (0~5%)
    if (returnRate >= -5) return '#fca5a5'; // 연한 빨강 (-5~0%)
    if (returnRate >= -10) return '#f87171'; // 빨강 (-10~-5%)
    return '#dc2626'; // 진한 빨강 (-10% 이하)
  };

  // 커스텀 Treemap 셀 렌더링
  const CustomizedContent = (props: any) => {
    const { x, y, width, height, name, ticker, returnRate, size } = props;

    // 필수 데이터 검증
    if (
      x === undefined ||
      y === undefined ||
      width === undefined ||
      height === undefined ||
      !ticker ||
      returnRate === undefined ||
      size === undefined
    ) {
      return null;
    }

    // 작은 셀은 텍스트 생략
    const showFullText = width > 80 && height > 60;
    const showTicker = width > 50 && height > 40;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: getColor(returnRate),
            stroke: '#fff',
            strokeWidth: 2,
            cursor: 'pointer',
          }}
        />
        {showTicker && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - (showFullText ? 15 : 5)}
              textAnchor="middle"
              fill="#fff"
              fontSize={showFullText ? 16 : 12}
              fontWeight="bold"
            >
              {ticker}
            </text>
            {showFullText && (
              <>
                <text
                  x={x + width / 2}
                  y={y + height / 2 + 5}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={12}
                >
                  {returnRate >= 0 ? '+' : ''}
                  {returnRate.toFixed(2)}%
                </text>
                <text
                  x={x + width / 2}
                  y={y + height / 2 + 22}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={11}
                  opacity={0.9}
                >
                  ₩{(size / 1000000).toFixed(1)}M
                </text>
              </>
            )}
          </>
        )}
      </g>
    );
  };

  // 커스텀 툴팁
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: TreemapNode = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-slate-200">
          <div className="mb-2">
            <p className="text-slate-900">{data.ticker}</p>
            <p className="text-slate-600">{data.name}</p>
          </div>
          <div className="space-y-1 border-t border-slate-200 pt-2">
            <div className="flex justify-between gap-4">
              <span className="text-slate-600">보유 주식:</span>
              <span className="text-slate-900">{data.shares.toLocaleString()}주</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-600">현재가:</span>
              <span className="text-slate-900">
                ${data.currentPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-600">평가금액:</span>
              <span className="text-slate-900">
                ₩{data.currentValue.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between gap-4 pt-2 border-t border-slate-200">
              <span className="text-slate-600">수익률:</span>
              <span
                className={
                  data.returnRate >= 0 ? 'text-green-600' : 'text-red-600'
                }
              >
                {data.returnRate >= 0 ? '+' : ''}
                {data.returnRate.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-600">수익금액:</span>
              <span
                className={
                  data.returnAmount >= 0 ? 'text-green-600' : 'text-red-600'
                }
              >
                {data.returnAmount >= 0 ? '+' : ''}
                ₩{data.returnAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (stockData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[600px] text-slate-500">
        포트폴리오 데이터가 없습니다
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-slate-900">투자 비중 히트맵</h2>
        <div className="flex items-center gap-4 text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-4 bg-green-500 rounded" />
            <span>수익</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-4 bg-red-500 rounded" />
            <span>손실</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={600}>
        <Treemap
          data={treemapData}
          dataKey="size"
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
}
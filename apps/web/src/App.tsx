import { useState } from 'react';
import { PortfolioTreemap } from './components/PortfolioTreemap';
import { PortfolioStats } from './components/PortfolioStats';
import { SettingsPanel } from './components/SettingsPanel';
import { Button } from './components/ui/button';
import { RefreshCw, Settings } from 'lucide-react';
import { usePortfolio } from './hooks/usePortfolio';
import type { StockData } from './types';

export default function App() {
  const { data, loading, refetch } = usePortfolio();
  const [showSettings, setShowSettings] = useState(false);
  const lastUpdate = new Date(); // In a real app, this might come from the API or be state

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-slate-900 mb-2">주식 포트폴리오 히트맵</h1>
              <p className="text-slate-600">
                마지막 업데이트: {lastUpdate.toLocaleString('ko-KR')}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="size-4" />
              </Button>
              <Button
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw className={`size-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                새로고침
              </Button>
            </div>
          </div>

          {/* Stats */}
          <PortfolioStats stockData={data as unknown as StockData[]} />
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <SettingsPanel onClose={() => setShowSettings(false)} />
        )}

        {/* Treemap */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {loading ? (
            <div className="flex items-center justify-center h-[600px]">
              <div className="text-center">
                <RefreshCw className="size-8 animate-spin mx-auto mb-4 text-slate-400" />
                <p className="text-slate-600">데이터를 불러오는 중...</p>
              </div>
            </div>
          ) : (
            <PortfolioTreemap stockData={data} />
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-slate-500">
          <p>
            💡 각 블록의 크기는 투자금액을, 색상은 수익률을 나타냅니다
          </p>
        </div>
      </div>
    </div>
  );
}

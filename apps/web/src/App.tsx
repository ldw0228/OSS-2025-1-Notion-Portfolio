import { useState, useEffect } from 'react';
import { PortfolioTreemap } from './components/PortfolioTreemap';
import { PortfolioStats } from './components/PortfolioStats';
import { SettingsPanel } from './components/SettingsPanel';
import { Button } from './components/ui/button';
import { RefreshCw, Settings } from 'lucide-react';
import { fetchNotionPortfolio, fetchYahooFinanceData } from './lib/api';
import type { StockData } from './types';

export default function App() {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [showSettings, setShowSettings] = useState(false);

  // @ts-ignore
  const loadData = async () => {
    setLoading(true);
    try {
      // Notion 데이터베이스에서 포트폴리오 데이터 가져오기
      const portfolioData = await fetchNotionPortfolio();
      
      // Yahoo Finance API로 실시간 가격 가져오기
      const enrichedData = await fetchYahooFinanceData(portfolioData);
      
      setStockData(enrichedData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('데이터 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
                onClick={loadData}
                disabled={loading}
              >
                <RefreshCw className={`size-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                새로고침
              </Button>
            </div>
          </div>

          {/* Stats */}
          <PortfolioStats stockData={stockData} />
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
            <PortfolioTreemap stockData={stockData} />
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

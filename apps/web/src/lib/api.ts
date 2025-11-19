import type { NotionPortfolioData, StockData } from '../types';

// Notion API 설정
const NOTION_API_KEY = 'YOUR_NOTION_API_KEY_HERE'; // Notion Integration Token으로 교체
const NOTION_DATABASE_ID = 'YOUR_DATABASE_ID_HERE'; // Notion 데이터베이스 ID로 교체

/**
 * Notion 데이터베이스에서 포트폴리오 데이터를 가져옵니다
 * 
 * Notion 데이터베이스 구조:
 * - Ticker (text): 주식 티커 심볼 (예: AAPL, GOOGL)
 * - Name (text): 종목명
 * - Shares (number): 보유 주식 수
 * - Average Price (number): 평균 매수 단가
 * - Sector (text, optional): 섹터 정보
 */
export async function fetchNotionPortfolio(): Promise<NotionPortfolioData[]> {
  // 실제 Notion API 호출 코드 (주석 처리)
  /*
  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    return data.results.map((page: any) => ({
      ticker: page.properties.Ticker?.rich_text?.[0]?.plain_text || '',
      name: page.properties.Name?.title?.[0]?.plain_text || '',
      shares: page.properties.Shares?.number || 0,
      averagePrice: page.properties['Average Price']?.number || 0,
      sector: page.properties.Sector?.select?.name || '',
    }));
  } catch (error) {
    console.error('Notion API 에러:', error);
    throw error;
  }
  */

  // Mock 데이터 (실제 API 연결 전 테스트용)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { ticker: 'AAPL', name: 'Apple Inc.', shares: 50, averagePrice: 150, sector: 'Technology' },
        { ticker: 'GOOGL', name: 'Alphabet Inc.', shares: 30, averagePrice: 2800, sector: 'Technology' },
        { ticker: 'MSFT', name: 'Microsoft Corp.', shares: 40, averagePrice: 300, sector: 'Technology' },
        { ticker: 'TSLA', name: 'Tesla Inc.', shares: 25, averagePrice: 700, sector: 'Automotive' },
        { ticker: 'NVDA', name: 'NVIDIA Corp.', shares: 20, averagePrice: 450, sector: 'Technology' },
        { ticker: 'AMZN', name: 'Amazon.com Inc.', shares: 35, averagePrice: 3200, sector: 'E-commerce' },
        { ticker: 'META', name: 'Meta Platforms Inc.', shares: 45, averagePrice: 320, sector: 'Technology' },
        { ticker: 'JPM', name: 'JPMorgan Chase', shares: 60, averagePrice: 140, sector: 'Finance' },
        { ticker: 'V', name: 'Visa Inc.', shares: 30, averagePrice: 220, sector: 'Finance' },
        { ticker: 'JNJ', name: 'Johnson & Johnson', shares: 40, averagePrice: 160, sector: 'Healthcare' },
      ]);
    }, 800);
  });
}

/**
 * Yahoo Finance API로 실시간 주가를 가져옵니다
 */
export async function fetchYahooFinanceData(
  portfolioData: NotionPortfolioData[]
): Promise<StockData[]> {
  // 실제 Yahoo Finance API 호출 코드 (주석 처리)
  /*
  try {
    const tickers = portfolioData.map(stock => stock.ticker).join(',');
    const response = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${tickers}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
      }
    );

    const data = await response.json();
    const quotes = data.quoteResponse.result;

    return portfolioData.map(stock => {
      const quote = quotes.find((q: any) => q.symbol === stock.ticker);
      const currentPrice = quote?.regularMarketPrice || stock.averagePrice;
      
      const investmentAmount = stock.shares * stock.averagePrice;
      const currentValue = stock.shares * currentPrice;
      const returnAmount = currentValue - investmentAmount;
      const returnRate = (returnAmount / investmentAmount) * 100;

      return {
        id: stock.ticker,
        ticker: stock.ticker,
        name: stock.name,
        shares: stock.shares,
        averagePrice: stock.averagePrice,
        currentPrice,
        investmentAmount,
        currentValue,
        returnAmount,
        returnRate,
        sector: stock.sector,
      };
    });
  } catch (error) {
    console.error('Yahoo Finance API 에러:', error);
    throw error;
  }
  */

  // Mock 데이터 (실시간 가격 시뮬레이션)
  return new Promise((resolve) => {
    setTimeout(() => {
      const enrichedData: StockData[] = portfolioData.map((stock) => {
        // 실시간 가격 시뮬레이션 (-10% ~ +15% 랜덤 변동)
        const priceChange = (Math.random() * 0.25 - 0.1) * stock.averagePrice;
        const currentPrice = stock.averagePrice + priceChange;

        const investmentAmount = stock.shares * stock.averagePrice;
        const currentValue = stock.shares * currentPrice;
        const returnAmount = currentValue - investmentAmount;
        const returnRate = (returnAmount / investmentAmount) * 100;

        return {
          id: stock.ticker,
          ticker: stock.ticker,
          name: stock.name,
          shares: stock.shares,
          averagePrice: stock.averagePrice,
          currentPrice,
          investmentAmount,
          currentValue,
          returnAmount,
          returnRate,
          sector: stock.sector,
        };
      });

      resolve(enrichedData);
    }, 600);
  });
}

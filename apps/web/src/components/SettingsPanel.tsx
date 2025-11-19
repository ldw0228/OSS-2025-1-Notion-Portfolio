import { X, ExternalLink, Database, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

interface SettingsPanelProps {
  onClose: () => void;
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  return (
    <div className="mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>API 설정</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Notion API 설정 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Database className="size-5 text-slate-600" />
              <h3 className="text-slate-900">Notion API 설정</h3>
            </div>
            <Alert>
              <AlertDescription>
                <div className="space-y-2">
                  <p>
                    <strong>1. Notion Integration 생성:</strong>
                  </p>
                  <p className="pl-4 text-slate-600">
                    • Notion → Settings & Members → Connections → Develop or manage integrations
                  </p>
                  <p className="pl-4 text-slate-600">
                    • New integration 생성 후 Internal Integration Token 복사
                  </p>
                  
                  <p className="mt-3">
                    <strong>2. 데이터베이스 공유:</strong>
                  </p>
                  <p className="pl-4 text-slate-600">
                    • 포트폴리오 데이터베이스 페이지에서 ⋯ → Connections → Integration 연결
                  </p>
                  
                  <p className="mt-3">
                    <strong>3. 데이터베이스 구조:</strong>
                  </p>
                  <ul className="pl-4 text-slate-600 list-disc list-inside space-y-1">
                    <li>Ticker (텍스트): 주식 티커 심볼 (예: AAPL)</li>
                    <li>Name (텍스트): 종목명</li>
                    <li>Shares (숫자): 보유 주식 수</li>
                    <li>Average Price (숫자): 평균 매수 단가</li>
                    <li>Sector (선택, 선택사항): 섹터 정보</li>
                  </ul>

                  <p className="mt-3">
                    <strong>4. 코드 설정:</strong>
                  </p>
                  <p className="pl-4 text-slate-600">
                    /lib/api.ts 파일의 NOTION_API_KEY와 NOTION_DATABASE_ID를 업데이트하세요.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
            <Button variant="outline" className="w-full" asChild>
              <a
                href="https://www.notion.so/my-integrations"
                target="_blank"
                rel="noopener noreferrer"
              >
                Notion Integrations 페이지 열기
                <ExternalLink className="size-4 ml-2" />
              </a>
            </Button>
          </div>

          {/* Yahoo Finance API 설정 */}
          <div className="space-y-3 pt-6 border-t">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-5 text-slate-600" />
              <h3 className="text-slate-900">Yahoo Finance API</h3>
            </div>
            <Alert>
              <AlertDescription>
                <div className="space-y-2">
                  <p>
                    Yahoo Finance API는 공개 API로 제공되지만, 프로덕션 환경에서는
                    RapidAPI를 통한 사용을 권장합니다.
                  </p>
                  
                  <p className="mt-3">
                    <strong>RapidAPI 설정 (권장):</strong>
                  </p>
                  <p className="pl-4 text-slate-600">
                    • RapidAPI에서 Yahoo Finance API 구독
                  </p>
                  <p className="pl-4 text-slate-600">
                    • API Key를 /lib/api.ts에 추가
                  </p>
                  
                  <p className="mt-3 text-slate-600">
                    현재는 Mock 데이터를 사용하여 실시간 가격 변동을 시뮬레이션합니다.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
            <Button variant="outline" className="w-full" asChild>
              <a
                href="https://rapidapi.com/apidojo/api/yahoo-finance1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Yahoo Finance API (RapidAPI) 보기
                <ExternalLink className="size-4 ml-2" />
              </a>
            </Button>
          </div>

          {/* 보안 권고사항 */}
          <div className="pt-6 border-t">
            <Alert>
              <AlertDescription>
                <p className="text-slate-900 mb-2">⚠️ 보안 권고사항</p>
                <ul className="text-slate-600 space-y-1 list-disc list-inside">
                  <li>API 키는 절대 클라이언트 코드에 노출하지 마세요</li>
                  <li>프로덕션 환경에서는 서버 사이드에서 API를 호출하세요</li>
                  <li>Supabase Edge Functions 또는 Next.js API Routes 사용 권장</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { X, ExternalLink, Database } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
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
                                    <p><strong>1. Notion Integration 생성:</strong></p>
                                    <p className="pl-4 text-slate-600">• Notion → Settings & Members → Connections → Develop or manage integrations</p>
                                    <p className="pl-4 text-slate-600">• New integration 생성 후 Internal Integration Token 복사</p>

                                    <p className="mt-3"><strong>2. 데이터베이스 공유:</strong></p>
                                    <p className="pl-4 text-slate-600">• 포트폴리오 데이터베이스 페이지에서 ⋯ → Connections → Integration 연결</p>

                                    <p className="mt-3"><strong>3. 데이터베이스 구조:</strong></p>
                                    <ul className="pl-4 text-slate-600 list-disc list-inside space-y-1">
                                        <li>Ticker (텍스트)</li>
                                        <li>Name (텍스트)</li>
                                        <li>Shares (숫자)</li>
                                        <li>Average Price (숫자)</li>
                                        <li>Sector (선택)</li>
                                    </ul>

                                    <p className="mt-3"><strong>4. 코드 설정:</strong></p>
                                    <p className="pl-4 text-slate-600">/lib/api.ts 파일의 NOTION_API_KEY와 NOTION_DATABASE_ID를 업데이트</p>
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

                </CardContent>
            </Card>
        </div>
    );
}

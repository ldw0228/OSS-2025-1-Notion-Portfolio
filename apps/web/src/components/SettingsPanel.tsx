import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

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
                <CardContent className="space-y-6"></CardContent>
            </Card>
        </div>
    );
}

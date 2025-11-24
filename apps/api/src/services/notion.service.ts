import { Client } from '@notionhq/client';
import { config } from '../config';

const notion = new Client({ auth: config.notion.apiKey });

export interface PortfolioItem {
    id: string;
    name: string;
    ticker: string;
    shares: number;
    averagePrice: number;
}

export const getPortfolioFromNotion = async (): Promise<PortfolioItem[]> => {
    if (!config.notion.databaseId) {
        throw new Error('NOTION_DATABASE_ID is not defined');
    }

    const response = await notion.databases.query({
        database_id: config.notion.databaseId,
    });

    const items: PortfolioItem[] = response.results.map((page: any) => {
        const props = page.properties;
        // Debug logging - disabled
        // console.log('Processing page:', page.id);
        // console.log('Properties:', JSON.stringify(props, null, 2));

        // Title is the database title column (shows as "Name" in UI)
        const name = props.Title?.title?.[0]?.plain_text || 'Unknown';

        const ticker = props.Ticker?.rich_text?.[0]?.plain_text || '';
        const shares = props.Shares?.number || 0;
        const averagePrice = props['Average Price']?.number || 0;

        return {
            id: page.id,
            name,
            ticker,
            shares,
            averagePrice,
        };
    }).filter(item => {
        const isValid = item.ticker && item.shares > 0;
        if (!isValid) {
            console.log('Skipping invalid item:', item);
        }
        return isValid;
    });

    console.log('Found valid items:', items.length);
    return items;
};

import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3001,
    notion: {
        apiKey: process.env.NOTION_API_KEY,
        databaseId: process.env.NOTION_DATABASE_ID,
    },
};

console.log('Loaded Config:', {
    port: config.port,
    databaseId: config.notion.databaseId,
    apiKeyLength: config.notion.apiKey?.length
});

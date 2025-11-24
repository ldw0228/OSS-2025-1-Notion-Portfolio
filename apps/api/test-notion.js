const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

console.log('Keys on notion.databases:', Object.keys(notion.databases));
if (typeof notion.databases.query === 'function') {
    console.log('notion.databases.query exists!');
} else {
    console.log('notion.databases.query DOES NOT exist!');
}

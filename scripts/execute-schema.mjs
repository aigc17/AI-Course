/**
 * [INPUT]: supabase/schema.sql - 数据库 schema 定义
 * [OUTPUT]: 执行 schema SQL 到 Supabase 数据库
 * [POS]: 临时脚本，用于初始化数据库 schema
 */
import pg from 'pg';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取 schema.sql
const schemaPath = join(__dirname, '..', 'supabase', 'schema.sql');
const schema = readFileSync(schemaPath, 'utf-8');

console.log('Schema SQL loaded, length:', schema.length);

// 使用 Supabase pooler 连接 (Transaction mode)
const connectionString = `postgresql://postgres.jpydxopdnrqyqhjkzenc:VyAIbPZaIFJ8UuC2@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres`;

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

try {
  console.log('Connecting to database...');
  await client.connect();
  console.log('Connected! Executing schema...');

  const result = await client.query(schema);
  console.log('Schema executed successfully!');
  console.log('Result:', result);

  // 验证表是否创建
  const tables = await client.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
  `);
  console.log('Tables in public schema:', tables.rows);

} catch (err) {
  console.error('Error:', err.message);
} finally {
  await client.end();
}

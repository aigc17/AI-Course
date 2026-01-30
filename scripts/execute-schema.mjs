/**
 * [INPUT]: supabase/schema.sql - 数据库 schema 定义
 * [OUTPUT]: 执行 schema SQL 到 Supabase 数据库
 * [POS]: 临时脚本，用于初始化数据库 schema
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabase = createClient(
  'https://jpydxopdnrqyqhjkzenc.supabase.co',
  'sb_secret_w7_WOGoLllrc-VvcxWkitA_F_Mqu4L4',
  { auth: { persistSession: false } }
);

// 读取 schema.sql
const schemaPath = join(__dirname, '..', 'supabase', 'schema.sql');
const schema = readFileSync(schemaPath, 'utf-8');

console.log('Schema SQL loaded, length:', schema.length);

// 尝试通过 RPC 执行 SQL
const { data, error } = await supabase.rpc('exec_sql', { query: schema });
console.log('RPC result:', { data, error });

// 检查表是否存在
const { data: courses, error: coursesError } = await supabase
  .from('courses')
  .select('id')
  .limit(1);
console.log('Courses table check:', { courses, coursesError });

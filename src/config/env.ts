import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  llmCoreUrl: process.env.LLM_CORE_URL ?? 'http://localhost:11434',
  openaiApiKey: process.env.OPENAI_API_KEY,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
  supabaseBucket: process.env.SUPABASE_BUCKET,

  // ... other providers
};

if (!ENV.openaiApiKey) throw new Error('Missing OPENAI_API_KEY');

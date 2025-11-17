import type { CorsOptions } from 'cors';
import cors from 'cors';

const ALLOWLIST = ['https://sanctuairy.netlify.app', 'http://localhost:5173', 'https://dialectiq-ten.vercel.app'] as const;

const options: CorsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);

    if (ALLOWLIST.includes(origin as (typeof ALLOWLIST)[number])) {
      return cb(null, true);
    }

    return cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: false,
  maxAge: 600,
};

export const corsBasic = cors(options);
export const corsPreflight = cors(options);

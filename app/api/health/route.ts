import { NextResponse } from 'next/server';

export async function GET() {
  const PRIMARY_SANDBOX_API_KEY = process.env.PRIMARY_SANDBOX_API_KEY;
  const E2B_API_KEY = process.env.E2B_API_KEY;
  
  return NextResponse.json({
    ok: true,
    sandbox: Boolean(PRIMARY_SANDBOX_API_KEY || E2B_API_KEY),
    primary: Boolean(PRIMARY_SANDBOX_API_KEY)
  });
}
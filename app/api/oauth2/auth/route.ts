import { NextRequest,NextResponse } from "next/server";
import { randomBytes, createHash } from 'crypto';

const REQUIRED_ENV_VARS = [
  'SALESFORCE_CLIENT_ID',
  'SALESFORCE_REDIRECT_URI',
  'SALESFORCE_LOGIN_URL'
] as const;

// PKCE Helper Functions
function generateCodeVerifier(): string {
  return randomBytes(32)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, 128);
}

function generateCodeChallenge(verifier: string): string {
  return createHash('sha256')
    .update(verifier)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function validateEnvironmentVariables(): string | null {
  for (const envVar of REQUIRED_ENV_VARS) {
    if (!process.env[envVar]) {
      return `Missing required environment variable: ${envVar}`;
    }
  }
  return null;
}

export async function GET(req: NextRequest) {
    try{
        const envError = validateEnvironmentVariables();
        if (envError) {
      console.error('Configuration error:', envError);
      return NextResponse.json(
        { 
          success: false,
          error: 'Server configuration error',
          code: 'CONFIG_ERROR'
        }, 
        { status: 500 }
      );
    }

    // Generate PKCE values
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    const state = crypto.randomUUID();

    const { searchParams } = new URL(req.url);
    console.log('Received search parameters:', searchParams.toString());
    const returnUrl = searchParams.get('returnUrl') || '/dashboard';

    const authParams = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.SALESFORCE_CLIENT_ID!,
      redirect_uri: process.env.SALESFORCE_REDIRECT_URI!,
      state: `${state}:${encodeURIComponent(returnUrl)}`,
      scope: 'api refresh_token',
      prompt: 'consent',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    });

    console.log('Generated auth URL parameters:', authParams.toString());

    const loginUrl = process.env.SALESFORCE_LOGIN_URL || 'https://login.salesforce.com';
    const authUrl = `${loginUrl}/services/oauth2/authorize?${authParams}`;
    console.log('Redirecting to OAuth authorization URL:', authUrl);
    const response = NextResponse.redirect(authUrl);
    
    
    // Store both state and code verifier in cookies
    console.log("state:", state);
    response.cookies.set('oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    });



    console.log("codeVerifier:", codeVerifier);
    response.cookies.set('code_verifier', codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10, // 10 minutes
      path: '/'
    });
    
    console.log('response:', response);
    return response;

    } catch (error) {
        console.error('Error in GET /oauth2/auth:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
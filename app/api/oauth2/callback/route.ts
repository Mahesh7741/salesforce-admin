// app/api/oauth2/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Connection } from "jsforce";

interface AuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  loginUrl: string;
}

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token?: string;
  instance_url?: string;
  issued_at?: string;
  signature?: string;
}

const REQUIRED_ENV_VARS = [
  "SALESFORCE_CLIENT_ID",
  "SALESFORCE_CLIENT_SECRET",
  "SALESFORCE_REDIRECT_URI",
  "SALESFORCE_LOGIN_URL",
];

function validateEnvironmentVariables(): void {
  for (const envVar of REQUIRED_ENV_VARS) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
}

function getAbsoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return new URL(path, baseUrl).toString();
}

function loadAuthConfig(): AuthConfig {
  validateEnvironmentVariables();

  return {
    clientId: process.env.SALESFORCE_CLIENT_ID!,
    clientSecret: process.env.SALESFORCE_CLIENT_SECRET!,
    redirectUri: process.env.SALESFORCE_REDIRECT_URI!,
    loginUrl:
      process.env.SALESFORCE_LOGIN_URL || "https://login.salesforce.com",
  };
}

async function storeRefreshToken(tokenData: TokenResponse): Promise<void> {
  if (!tokenData.refresh_token) {
    console.warn("No refresh token provided.");
    return;
  }

  try {
    (await cookies()).set("refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
  } catch (error) {
    console.error("Failed to store refresh token:", error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const config = loadAuthConfig();
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      return NextResponse.json(
        { error: "Missing code or state" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const storedState = cookieStore.get("oauth_state")?.value;

    if (!storedState || !state.startsWith(storedState)) {
      return NextResponse.json({ error: "Invalid state" }, { status: 403 });
    }

    const [, returnUrl = "/"] = state.split(":");
    const decodedReturnUrl = decodeURIComponent(returnUrl);
    const codeVerifier = cookieStore.get("code_verifier")?.value;

    if (!codeVerifier) {
      return NextResponse.json(
        { error: "Missing code verifier" },
        { status: 400 }
      );
    }

    const tokenRes = await fetch(`${config.loginUrl}/services/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUri,
        code,
        code_verifier: codeVerifier,
      }),
    });

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      console.error("Token exchange failed:", errorText);
      return NextResponse.json(
        { error: "Token exchange failed" },
        { status: 400 }
      );
    }

    const tokenData: TokenResponse = await tokenRes.json();
    const response = NextResponse.redirect(getAbsoluteUrl(decodedReturnUrl));

    // Connect to Salesforce and get user info
    const conn = new Connection({
      oauth2: {
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        redirectUri: config.redirectUri,
        loginUrl: config.loginUrl,
      },
      accessToken: tokenData.access_token,
      instanceUrl: tokenData.instance_url,
    });

    const userInfo = await conn.identity();

    // Store everything in a session cookie
    const session = {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      instanceUrl: tokenData.instance_url,
      issued_at: tokenData.issued_at || new Date().toISOString(),
      scope: tokenData.scope,
      token_type: tokenData.token_type,
      userInfo: {
        id: userInfo.user_id,
        username: userInfo.username,
        orgId: userInfo.organization_id,
        email: userInfo.email,
        profile: userInfo.urls?.profile,
      },
    };
    console.log("Session created:", session);

    // Set session cookie
    response.cookies.set("sf_session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    if (tokenData.refresh_token) {
      await storeRefreshToken(tokenData);
    }

    // Cleanup PKCE cookies
    response.cookies.delete("code_verifier");
    response.cookies.delete("oauth_state");
    const responseJSON = {
      userInfo: session.userInfo,
      accessToken: session.accessToken,
      instanceUrl: session.instanceUrl,
      refreshToken: session.refreshToken,
    };
    console.log("responseJSON :", responseJSON);
    return NextResponse.json({ responseJSON });
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

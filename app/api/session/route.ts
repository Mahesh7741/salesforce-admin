import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("sf_session")?.value;
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }
  return NextResponse.json(JSON.parse(session));
}

export async function POST() {
  const cookieStore = await cookies();
  const session = cookieStore.get("sf_session")?.value;
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }
  const parsedSession = JSON.parse(session);
  const refreshToken = parsedSession.refreshToken;
  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 400 });
  }

  // Load config from env
  const clientId = process.env.SALESFORCE_CLIENT_ID;
  const clientSecret = process.env.SALESFORCE_CLIENT_SECRET;
  const redirectUri = process.env.SALESFORCE_REDIRECT_URI;
  const loginUrl = process.env.SALESFORCE_LOGIN_URL || "https://login.salesforce.com";

  // Request new access token
  const tokenRes = await fetch(`${loginUrl}/services/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: clientId!,
      client_secret: clientSecret!,
      refresh_token: refreshToken,
      redirect_uri: redirectUri!,
    }),
  });

  if (!tokenRes.ok) {
    const errorText = await tokenRes.text();
    return NextResponse.json({ error: "Failed to refresh token", details: errorText }, { status: 400 });
  }

  const tokenData = await tokenRes.json();
  // Update session with new access token
  const newSession = {
    ...parsedSession,
    accessToken: tokenData.access_token,
    instanceUrl: tokenData.instance_url || parsedSession.instanceUrl,
    issued_at: tokenData.issued_at || new Date().toISOString(),
    scope: tokenData.scope || parsedSession.scope,
    token_type: tokenData.token_type || parsedSession.token_type,
  };
  // Update cookie
  cookieStore.set("sf_session", JSON.stringify(newSession), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });
  return NextResponse.json(newSession);
} 
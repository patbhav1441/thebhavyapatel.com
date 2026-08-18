type OAuthEnv = Env &
  Readonly<{
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    OAUTH_STATE_SECRET: string;
    DEV_ALLOWED_ORIGIN?: string;
  }>;

declare interface Env {
  readonly NODE_ENV: string;
  readonly NG_APP_ENV: string;
  readonly NG_APP_BASE_API_URL: string;
  readonly NG_APP_YOUTUBE_API_KEY: string;
}

declare interface ImportMeta {
  readonly env: Env;
}

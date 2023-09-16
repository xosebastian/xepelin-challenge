export async function getConfigValues() {
  return {
    environment: process.env.ENVIRONMENT,
    appName: process.env.PROJECT_NAME,
    dbConfig: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME,
    },
    assetsConfig: {
      baseUrl: process.env.ASSETS_BASE_URL,
    },
  };
}

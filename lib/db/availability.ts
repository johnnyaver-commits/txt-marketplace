export class ServiceUnavailableError extends Error {
  constructor(message = '服務尚未完成資料庫設定') {
    super(message);
    this.name = 'ServiceUnavailableError';
  }
}

export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

export function assertDatabaseConfigured() {
  if (!hasDatabaseUrl()) throw new ServiceUnavailableError();
}

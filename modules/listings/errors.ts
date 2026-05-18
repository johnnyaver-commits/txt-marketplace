export class ListingError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'ListingError';
  }
}

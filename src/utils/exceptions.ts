export class DomainError extends Error {
  name: string;
  constructor(msg: string) {
    super(msg);
    this.name = 'DomainError';
  }
}

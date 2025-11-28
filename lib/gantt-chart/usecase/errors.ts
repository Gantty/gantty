// Domain-specific error classes

export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public constraint: string
  ) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class NotFoundError extends Error {
  constructor(
    public entityType: string,
    public entityId: string
  ) {
    super(`${entityType} with id ${entityId} not found`);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class QuotaExceededError extends Error {
  constructor() {
    super('Storage quota exceeded. Please delete some versions or events.');
    this.name = 'QuotaExceededError';
    Object.setPrototypeOf(this, QuotaExceededError.prototype);
  }
}

export class StorageUnavailableError extends Error {
  constructor() {
    super('localStorage is not available. Please enable storage in your browser.');
    this.name = 'StorageUnavailableError';
    Object.setPrototypeOf(this, StorageUnavailableError.prototype);
  }
}

export class BusinessRuleViolationError extends Error {
  constructor(
    message: string,
    public rule: string
  ) {
    super(message);
    this.name = 'BusinessRuleViolationError';
    Object.setPrototypeOf(this, BusinessRuleViolationError.prototype);
  }
}

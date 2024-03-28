export enum CustomErrorCodes {
  VALIDATION_ERROR = 4001,
}

export interface CustomError {
  field?: string;
  message: string;
  code?: number;
}

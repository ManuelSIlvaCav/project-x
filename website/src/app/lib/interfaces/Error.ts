export enum CustomErrorCodes {
  VALIDATION_ERROR = 4001,
}

export interface CustomError {
  errors: { field: string; message: string }[];
  code: number;
}

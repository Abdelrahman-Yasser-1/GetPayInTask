export interface IVerifyOtpRes {
  Status: string;
  ErrorMessage: string | null;
  Result: string | null;
  IsValid: boolean;
}

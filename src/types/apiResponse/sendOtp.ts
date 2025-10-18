export interface ISendOtpRes {
  Status: string;
  ErrorMessage: string | null;
  Result: {
    OtpTocken: string;
  } | null;
  IsValid: boolean;
}

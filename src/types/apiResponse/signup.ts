export interface ISignUpRes {
  Status: string;
  ErrorMessage: string | null;
  Result: {
    Message: string;
    url: string;
    accessToken: string;
    refreshToken: string;
  } | null;
  IsValid: boolean;
}

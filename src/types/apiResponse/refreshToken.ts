export interface IRefreshTokenRes {
  Status: string;
  ErrorMessage: string | null;
  Result: {
    Message: string;
    accessToken: string;
    refreshToken: string;
  } | null;
  IsValid: boolean;
}

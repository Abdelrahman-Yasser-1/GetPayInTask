export enum OtpPurpose {
  SignUp = 1,
  SignIn = 2,
  ResetPassword = 3,
  ForgetPassword = 4,
  EditProfile = 5,
}

export interface ISendOtpDto {
  mode: 'sms' | 'email';
  purpose: OtpPurpose;
  mobileNumber?: string;
  email?: string;
}

import { OtpPurpose } from './sendOtp';

export interface IVerifyOtpDto {
  purpose: OtpPurpose;
  mobileNumber: string;
  OtpCode: string;
  otpTocken: string;
  email: string;
}

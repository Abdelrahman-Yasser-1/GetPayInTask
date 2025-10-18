interface Userdata {
  MobileNumber: string;
  EmailAddress: string;
  Region: string;
  City: string;
  PoBox?: string;
  Address?: string;
  Employer?: string;
  JobTitle?: string;
  UserType?: string;
}
export interface ISignUpDto {
  NafathAccessToken: string;
  ResidentId: string;
  ChannelId: number;
  Userdata: Userdata;
}

import { HttpClient } from '@src/services';
import API_END_POINTS from '@src/services/apiEndPoints';
import { IGetUserInfoRes, ILoginRes } from '@src/types/apiResponse';
import { ILoginDto } from '@src/types/dto';

const AUTH_SERVICES = {
  login: (params: ILoginDto): Promise<ILoginRes> =>
    HttpClient.post(API_END_POINTS.LOGIN, params)
      .then(res => res.data)
      .catch(error => {
        console.error('Error in login:', error);
        throw error;
      }),

  getUserInfo: (): Promise<IGetUserInfoRes> =>
    HttpClient.get(API_END_POINTS.GET_USER_INFO)
      .then(res => {
        console.log('user info response', JSON.stringify(res.data, null, 2));
        return res.data;
      })
      .catch(error => {
        console.error('Error in me:', error);
        throw error;
      }),
};

export default AUTH_SERVICES;

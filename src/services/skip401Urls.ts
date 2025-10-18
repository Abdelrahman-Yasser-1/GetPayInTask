import API_END_POINTS from './apiEndPoints';

const skip401Urls = [
  API_END_POINTS.REFRESH_TOKEN,
  API_END_POINTS.LOGIN,
  API_END_POINTS.GET_USER_INFO,
];

export default skip401Urls;

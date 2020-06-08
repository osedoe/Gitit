import { requestWithToken } from './utils/Oauth';

const API = {
    getAllNotifications: () => requestWithToken('notifications')
};

export default API;

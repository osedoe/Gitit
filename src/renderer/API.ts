import { requestWithToken } from './utils/Oauth';

const API = {
    getAllNotifications: (all = false, participating = false, since = '', before = '') =>
        requestWithToken(
            `notifications?all=${all}&participating=${participating}&since=${since}&before=${before}`
        ),
    getThread: (threadId: string) => requestWithToken(`notifications/threads/${threadId}`)
};

export default API;

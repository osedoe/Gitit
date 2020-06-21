import { requestWithAuth } from './utils';

const API = {
    getAllNotifications: (all = true, participating = false, since = '', before = '') =>
        requestWithAuth(`notifications?all=${all}&participating=${participating}&since=${since}&before=${before}`),
    getThread: (threadId: string) => requestWithAuth(`notifications/threads/${threadId}`)
};

export default API;

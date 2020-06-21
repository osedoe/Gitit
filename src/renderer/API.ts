import { pollWithAuth, requestWithAuth } from './utils';

const API = {
    getAllNotifications: (all = false, participating = false, since = '', before = '') =>
        // requestWithAuth(`notifications?all=${all}&participating=${participating}&since=${since}&before=${before}`),
        pollWithAuth(`notifications?all=${all}&participating=${participating}&since=${since}&before=${before}`),
    getThread: (threadId: string) => requestWithAuth(`notifications/threads/${threadId}`)
};

export default API;

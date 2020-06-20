import { requestWithAuth } from './utils';

const API = {
    getAllNotifications: (all = false, participating = false, since = '', before = '') =>
        requestWithAuth(`notifications`),
    getThread: (threadId: string) => requestWithAuth(`notifications/threads/${threadId}`)
};

export default API;

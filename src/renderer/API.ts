import { requestWithAuth } from './utils';

interface NotificationsOptions {
  all?: boolean;
  participating?: boolean;
  since?: string;
  before?: string;
}


const API = {
  getAllNotifications: (authHeader: string, options: NotificationsOptions) => {
    const { all = false, participating = false, since = '', before = '' } = options;
    return requestWithAuth(`notifications?all=${all}&participating=${participating}&since=${since}&before=${before}`);
  },
  getThread: (threadId: string) => requestWithAuth(`notifications/threads/${threadId}`)
};

export default API;

export interface AccessTokenResponse extends Response {
    access_token: string;
    scope: string;
    token_type: string;
}

export interface Headers {
    Authorization?: string;
    Accept?: string;
    'Content-Type'?: string;
    'Access-Control-Allow-Headers'?: string;
    'Access-Control-Allow-Origin'?: string;
    'Last-Modified'?: string;
    'X-Poll-Interval'?: string;

    [key: string]: string;
}

export interface NotificationsResponse {
    id: string;
    last_read_at?: string;
    reason: string;
    repository: {
        archive_url: string;
        blobs_url: string;
        branches_url: string;
        collaborators_url: string;
        comments_url: string;
        commits_url: string;
        compare_url: string;
        contents_url: string;
        contributors_url: string;
        deployments_url: string;
        description?: string;
        downloads_url: string;
        events_url: string;
        fork: boolean;
        forks_url: string;
        full_name: string;
        git_commits_url: string;
        git_refs_url: string;
        git_tags_url: string;
        hooks_url: string;
        html_url: string;
        id: number;
        issue_comment_url: string;
        issue_events_url: string;
        issues_url: string;
        keys_url: string;
        labels_url: string;
        languages_url: string;
        merges_url: string;
        milestones_url: string;
        name: string;
        node_id: string;
        notifications_url: string;

        [key: string]: any;
    };
    subject: {
        title: string;
        type: string;
        url: string;

        [key: string]: string;
    };
    unread: boolean;
    updated_at: string;
    url: string; // thread
}

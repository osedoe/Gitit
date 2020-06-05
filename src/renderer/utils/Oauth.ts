import BrowserWindow = Electron.BrowserWindow;

export function authGithub(authOptions = process.env.DEFAULT_AUTH_OPTIONS, dispatch) {
    // Build the OAuth consent page URL
    const authWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: true
    });

    const githubUrl = `https://${authOptions.hostname}/login/oauth/authorize`;
    const authUrl = `${githubUrl}?client_id=${authOptions.clientId}&scope=${process.env.AUTH_SCOPE}`;

    const {session} = authWindow.webContents;
    session.clearStorageData();

    authWindow.loadURL(authUrl);

    function handleCallback(url) {
        const raw_code = /code=([^&]*)/.exec(url) || null;
        const code = raw_code && raw_code.length > 1 ? raw_code[1] : null;
        const error = /\?error=(.+)$/.exec(url);

        if (code || error) {
            // Close the browser if code found or error
            authWindow.destroy();
        }

        // If there is a code, proceed to get token from github
        if (code) {
            dispatch(loginUser(authOptions, code));
        } else if (error) {
            alert(
                "Oops! Something went wrong and we couldn't " +
                    'log you in using Github. Please try again.'
            );
        }
    }

    // If "Done" button is pressed, hide "Loading"
    authWindow.on('close', () => {
        authWindow.destroy();
    });

    authWindow.webContents.on(
        'did-fail-load',
        (event, errorCode, errorDescription, validatedURL) => {
            if (validatedURL.includes(authOptions.hostname)) {
                authWindow.destroy();
                dialog.showErrorBox(
                    'Invalid Hostname',
                    `Could not load https://${authOptions.hostname}/.`
                );
            }
        }
    );

    authWindow.webContents.on('will-redirect', (event, url) => {
        event.preventDefault();
        handleCallback(url);
    });
}

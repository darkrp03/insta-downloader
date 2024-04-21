export class InstagramCookie {
    private userAgent: string = "";
    private appId: string = "";
    private cookies: string = "";
    private csrfToken: string = "";

    private loadCookiesFromEnv() {
        const cookies = process.env.INSTA_COOKIES;

        if (!cookies) {
            throw new Error('Empty instagram cookies!');
        }

        this.cookies = cookies;
    }

    private loadUserAgentFromEnv() {
        const userAgent = process.env.USER_AGENT;

        if (!userAgent) {
            throw new Error('Empty user agent!');
        }

        this.userAgent = userAgent;
    }

    private loadAppIdFromEnv() {
        const appId = process.env.X_IG_APP_ID;

        if (!appId) {
            throw new Error('Empty user agent!');
        }

        this.userAgent = appId;
    }

    private loadCSRFTokenFromEnv() {
        const csrfToken = process.env.X_CSRF_TOKEN;

        if (!csrfToken) {
            throw new Error('Emty csrf token!');
        }

        this.csrfToken = csrfToken;
    }

    getHeaders() {
        return {
            "Accept-Language": "en-US,en;q=0.9,ru;q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept": "*/*",
            "User-Agent": this.userAgent,
            "Cookie": this.cookies,
            "X-Ig-App-Id": this.appId,
            "X-Csrftoken": this.csrfToken,
            "Sec-Fetch-Site": "same-origin"
        };
    }

    load() {
        this.loadUserAgentFromEnv();
        this.loadAppIdFromEnv();
        this.loadCookiesFromEnv();
        this.loadCSRFTokenFromEnv();
    }
}
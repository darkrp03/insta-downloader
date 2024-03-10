export class InstaCredentials {
    private static userAgent: string = "";
    private static appId: string = "";
    private static cookies: string = "";

    private static loadCookiesFromEnv() {
        const cookies = process.env.INSTA_COOKIES;

        if (!cookies) {
            throw new Error('Empty instagram cookies!');
        }

        this.cookies = cookies;
    }

    private static loadUserAgentFromEnv() {
        const userAgent = process.env.USER_AGENT;

        if (!userAgent) {
            throw new Error('Empty user agent!');
        }

        this.userAgent = userAgent;
    }

    private static loadAppIdFromEnv() {
        const appId = process.env.X_IG_APP_ID;

        if (!appId) {
            throw new Error('Empty user agent!');
        }

        this.userAgent = appId;
    }

    static getHeaders() {
        const headers = {
            "Accept-Language": "en-US,en;q=0.9,ru;q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept": "*/*",
            "User-Agent": this.userAgent,
            "Cookie": this.cookies,
            "X-Ig-App-Id": this.appId
        };
        
        return headers;
    }

    static load() {
        this.loadUserAgentFromEnv();
        this.loadAppIdFromEnv();
        this.loadCookiesFromEnv();
    }
}
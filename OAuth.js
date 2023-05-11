const {Controller, Request} = require("./Api");
const Vendor = require("./Vendor");
const App = require("./App");

class SessionToken {
    constructor(token, account, expires, app) {
        this.token = token;
        this.account = account;
        this.expires = expires;
        this.app = app;
    }

    async waitForConfirmation() {
        const api = new Controller();
        const request = new Request("GET", "https://api.codeoffer.net/v1/oauth/session/state", `session=${this.token}`);
        const response = await api.sendRequest(request);
        Controller.handleResponse(response);
        this.account = response.data["account"];
    }

    getLoginLink() {
        return `https://codeoffer.net/oauth/login?session=${this.token}`;
    }
}
class SessionTokenOverview {
    constructor(sessionToken, app, accessToken) {
        this.sessionToken = sessionToken;
        this.app = app;
        this.accessToken = accessToken;
    }
}
class Session {
    constructor(appId) {
        this.appId = appId;
    }

    async createSessionToken() {
        const api = new Controller();
        const request = new Request("PUT", "https://api.codeoffer.net/v1/oauth/session", JSON.stringify({
            app: this.appId
        }));
        const response = await api.sendRequest(request);
        Controller.handleResponse(response);
        return new SessionToken(response.data["token"], response.data["account"], response.data["expires"], response.data["app"]);
    }
}

module.exports = {
    Session,
    SessionToken,
    SessionTokenOverview,
    async getSessionToken(token) {
        const api = new Controller();
        const request = new Request("GET", "https://api.codeoffer.net/v1/oauth/session", `session=${token}&validate=false`);
        const response = await api.sendRequest(request);
        Controller.handleResponse(response);
        const vendor = new Vendor(response.data["app"]["vendor"]["uuid"], response.data["app"]["vendor"]["username"], response.data["app"]["vendor"]["verified"], response.data["app"]["vendor"]["profile_picture"]);
        const app = new App(response.data["app"]["uuid"], response.data["app"]["name"], response.data["app"]["icon"], vendor);
        return new SessionTokenOverview(response.data["session_token"], app, response.data["access_token"]);
    }
}
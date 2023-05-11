const {Controller, Request} = require("./api");

class User {
    constructor(uuid, username, profile_picture, email, access) {
        this.uuid = uuid;
        this.username = username;
        this.profile_picture = profile_picture;
        this.email = email;
        this.access = access;
    }

    static async getUser(token) {
        const api = new Controller();
        const request = new Request("GET", "https://api.codeoffer.net/v1/oauth/session/user", null, {
            "OAuth-Session": token.token
        });
        const response = await api.sendRequest(request);
        Controller.handleResponse(response);
        return new User(response.data["uuid"], response.data["username"], response.data["profile_picture"], response.data["email"], response.data["access"]);
    }
}

module.exports = User
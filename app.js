const {Controller, Request} = require("./api");
const {UnauthorizedException} = require("./exceptions");

class App {
    constructor(uuid, name, icon, vendor) {
        this.uuid = uuid;
        this.name = name;
        this.icon = icon;
        this.vendor = vendor;
    }

    static async getAssetDirectory(token) {
        if(token.account === null) throw new UnauthorizedException("The user must be logged in to perform this action.");
        const api = new Controller();
        const request = new Request("GET", "https://api.codeoffer.net/v1/app/assets", `uuid=${token.app}`, {
            "OAuth-Session": token.token
        });
        const response = await api.sendRequest(request);
        Controller.handleResponse(response);
        const assets = [];
        for(const item of response.data) {
            let asset = new Asset(item["uuid"], item["identifier"], item["name"], item["description"], item["access"], item["active"]);
            asset.sessionToken = token;
            assets.push(asset);
        }

        return assets;
    }

}
class Asset {
    constructor(uuid, identifier, name, description, access, active) {
        this.uuid = uuid;
        this.identifier = identifier;
        this.name = name;
        this.description = description;
        this.access = access;
        this.active = active;
        this.sessionToken = null;
    }

    async getValue() {
        const api = new Controller();
        const request = new Request("GET", "https://api.codeoffer.net/v1/app/asset", `uuid=${this.uuid}`, {
            "OAuth-Session": this.sessionToken.token
        });
        const response = await api.sendRequest(request);
        Controller.handleResponse(response);
        return atob(response.data["value"]);
    }
}

module.exports = {
    App,
    Asset
}
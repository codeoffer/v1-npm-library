const {BadRequestException, ConflictException, ForbiddenException, InternalServerException, NotFoundException,
    TimeoutException, UnauthorizedException
} = require("./exceptions");
class Controller {
    async sendRequest(request) {
        let options = {
            method: request.method,
            headers: request.headers
        }
        if (request.method === "GET" || request.method === "DELETE") {
            request.url += `?${request.data}`;
        } else {
            options["body"] = request.data;
        }
        const response = await fetch(request.url, options);
        const json = await response.json();
        return new Response(response.status, json["code"], json["message"], json["data"]);
    }

    static handleResponse(response) {
        if(response.status !== 200) {
            switch (response) {
                case 400:
                    throw new BadRequestException(response.message);
                case 409:
                    throw new ConflictException(response.message);
                case 403:
                    throw new ForbiddenException(response.message);
                case 500:
                    throw new InternalServerException(response.message);
                case 404:
                    throw new NotFoundException(response.message);
                case 408:
                    throw new TimeoutException(response.message);
                case 401:
                    throw new UnauthorizedException(response.message);
            }
        }
    }
}
class Request {
    constructor(method, url, data = null, headers = {}) {
        this.method = method;
        this.url = url;
        this.data = data;
        this.headers = headers;
    }
}
class Response {
    constructor(status, code, message, data) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

module.exports = {
    Controller,
    Request,
    Response
}
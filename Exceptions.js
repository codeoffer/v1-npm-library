class BadRequestException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
class ConflictException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 409;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
class ForbiddenException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 403;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
class InternalServerException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 500;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
class NotFoundException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
class TimeoutException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 408;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
class UnauthorizedException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerException,
    NotFoundException,
    TimeoutException,
    UnauthorizedException
}
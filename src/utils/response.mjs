"use strict";

/**
 * @class Response
 * */
class Response {

    /**
     * @property {Boolean} success (true/false)
     * @property {Number} code (status code)
     * @property {String} message (response message)
     * @property {Object} data (response data)
     * */
    constructor(success, code, message, data) {
        this.success = success;
        this.code = code;
        this.message = message;
        this.data = data;
    };
}

export default Response;
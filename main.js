const EventEmitter = require('events');
const http = require('http');
const url = require('url');

module.exports = class Client {
    constructor(url, username, password, authenticationHeader = 'Authorization') {
        this.url = url;
        this.username = username;
        this.password = password;
        this.authenticationHeader = authenticationHeader;
        this.eventEmitter = new EventEmitter();
    }

    prepareBody(method, params) {
        return JSON.stringify({
            'id': (new Date()).getTime(),
            'jsonrpc': '2.0',
            'method': method,
            'params': params
        });
    }

    prepareHeaders(body) {
        var credentials = Buffer.from(this.username + ':' + this.password, 'ascii').toString('base64');

        var headers = {
            'User-Agent': 'Kanboard Javascript API Client',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Content-Length': Buffer.byteLength(body)
        };

        if (this.authenticationHeader === 'Authorization') {
            headers.Authorization = 'Basic ' + credentials;
        } else {
            headers[this.authenticationHeader] = credentials;
        }

        return headers;
    }

    prepareRequest(body) {
        var urlParams = url.parse(this.url);
        return {
            protocol: urlParams.protocol,
            hostname: urlParams.hostname,
            port: urlParams.port,
            path: urlParams.path,
            method: 'POST',
            headers: this.prepareHeaders(body)
        };
    }

    execute(method, params = null) {
        var body = this.prepareBody(method, params);
        var options = this.prepareRequest(body);
        var buffer = '';

        var req = http.request(options, (res) => {
            res.setEncoding('utf8');

            res.on('data', (chunk) => {
                buffer += chunk;
            });

            res.on('end', () => {
                this.parseResponse(buffer);
            });
        });

        req.on('error', (e) => {
            this.eventEmitter.emit('error', e);
        });

        req.write(body);
        req.end();

        return this.eventEmitter;
    }

    parseResponse(body) {
        var response = JSON.parse(body);

        if (response.hasOwnProperty('result')) {
            this.eventEmitter.emit('success', response.result);
        } else if (response.hasOwnProperty('error')) {
            this.eventEmitter.emit('error', new Error(response.error.message));
        }
    }
};

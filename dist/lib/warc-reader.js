"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gzip_reader_1 = require("gzip-reader");
const file_reader_1 = require("file-reader");
class WarcReader {
    constructor(_fileOrFd, _isGzip, _startAt = 0, _chunkSize = 65536) {
        this._fileOrFd = _fileOrFd;
        this._isGzip = _isGzip;
        this._chunkSize = _chunkSize;
        if (typeof _fileOrFd == "string" && _fileOrFd.endsWith("gz"))
            _isGzip = true;
        this._reader = _isGzip ? new gzip_reader_1.GzipReader(_fileOrFd, _startAt, _chunkSize) : file_reader_1.FileReader(_fileOrFd, _startAt, _chunkSize);
        this._unused = [];
        this._hRegex = /([a-zA-Z_\-]+): *(.*)/g;
        this._CRLF = Buffer.from("\r\n");
        this._doubleCRLF = Buffer.from("\r\n\r\n");
        this._offset = 0;
    }
    [Symbol.iterator]() {
        return this._warcReader();
    }
    entries() {
        return this._warcReader();
    }
    *_warcReader() {
        for (const chunk of this._reader) {
            this._unused.push(chunk);
            const unused = Buffer.concat(this._unused);
            this._unused.splice(0);
            this._offset = 0;
            while (true) {
                // Parsing headers
                const i = unused.indexOf(this._doubleCRLF, this._offset);
                if (i < 0) {
                    this._unused.push(unused);
                    break;
                }
                const hStr = unused.slice(this._offset, i);
                const version = hStr.slice(0, hStr.indexOf(this._CRLF)).toString();
                const headers = this._parseHeaders(hStr);
                // Parsing content
                this._offset = i + 4; // content starts
                const contentLength = parseInt(headers["Content-Length"]);
                const ii = unused.indexOf(this._doubleCRLF, this._offset + contentLength - 1);
                if (ii < 0) {
                    this._unused.push(unused);
                    break;
                }
                const content = unused.slice(this._offset, ii);
                yield { version, headers, content };
                this._offset = ii + 4; // next record starts
            }
        }
        this._cleanUp();
    }
    _parseHeaders(findIn) {
        const headers = {};
        findIn.toString().replace(this._hRegex, (match, $1, $2) => headers[$1] = $2);
        return headers;
    }
    _cleanUp() {
        this._reader = null;
        this._unused = null;
        this._hRegex = null;
        this._doubleCRLF = null;
        this._CRLF = null;
        this._offset = null;
    }
}
exports.WarcReader = WarcReader;
//# sourceMappingURL=warc-reader.js.map
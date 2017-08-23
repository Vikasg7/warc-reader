/// <reference types="node" />
export interface WarcHeaders {
    'WARC-Type': string;
    'WARC-Date': string;
    'WARC-Record-ID': string;
    'Content-Length': string;
    'Content-Type': string;
    'WARC-Warcinfo-ID': string;
    'WARC-Concurrent-To': string;
    'WARC-IP-Address': string;
    'WARC-Target-URI': string;
    'WARC-Payload-Digest': string;
    'WARC-Block-Digest': string;
    [key: string]: string;
}
export interface WarcRecord {
    version: string;
    headers: WarcHeaders;
    content: Buffer;
}
export declare class WarcReader {
    private _fileOrFd;
    private _isGzip;
    private _chunkSize;
    private _reader;
    private _unused;
    private _hRegex;
    private _CRLF;
    private _doubleCRLF;
    private _offset;
    constructor(_fileOrFd: string | number, _isGzip?: boolean, _startAt?: number, _chunkSize?: number);
    [Symbol.iterator](): IterableIterator<WarcRecord>;
    entries(): IterableIterator<WarcRecord>;
    private _warcReader();
    private _parseHeaders(findIn);
    private _cleanUp();
}

/// <reference path="../../typings/lz-string/lz-string.d.ts" />
import { app } from '../core/settings';
export default class Storage {
    constructor($window) {
        this.LZString = $window.LZString;
        this.local = $window.localStorage;
        this.prefix = `f.${app.version}`;
        this.init();
    }
    init() {
        // version 0.2.0
        Object.keys(this.local).filter(key => key.includes('0.2.0')).forEach(key => {
            this.remove(key);
        });
    }
    compact(value) {
        return this.LZString.compressToUTF16(JSON.stringify(value));
    }
    descompact(value) {
        return JSON.parse(this.LZString.decompressFromUTF16(value));
    }
    write(path, values) {
        this.local.setItem(`${this.prefix}.${path}`, this.compact(values));
    }
    read(path) {
        const data = this.local.getItem(`${this.prefix}.${path}`);
        return (data) ? this.descompact(data) : null;
    }
    remove(path) {
        this.local.removeItem(path);
    }
    clear() {
        this.local.clear();
    }
}
Storage.IID = 'StorageService';
Storage.$inject = ['$window'];

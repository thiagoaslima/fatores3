/// <reference path="../../typings/lz-string/lz-string.d.ts" />

import { app } from '../core/settings';
import { toIdMap } from '../utils/arrays';
import { toArray } from '../utils/objects';

export default class Storage {
    static IID = 'StorageService';
    static $inject = ['$window'];
    
    private LZString: LZString.LZStringStatic;
    private local;
    private prefix: string;

    constructor($window: ng.IWindowService) {
        this.LZString = $window.LZString;
        this.local = $window.localStorage;
        this.prefix = `f.${app.version}`;

        this.init();
    }

    private init() {
        // version 0.2.0
        Object.keys(this.local).filter(key => key.includes('0.2.0')).forEach(key => {
            this.remove(key);
        });
    }

    private compact(value: any): string {
        return this.LZString.compressToUTF16(JSON.stringify(value));
    }

    private descompact(value: string) {
        return JSON.parse(this.LZString.decompressFromUTF16(value));
    }

    public write(path: string, values: any): void {
        this.local.setItem(`${this.prefix}.${path}`, this.compact(values));
    }

    public read(path: string): any {
        const data = this.local.getItem(`${this.prefix}.${path}`);
        return (data) ? this.descompact(data) : null;
    }

    private remove(path: string): void {
        this.local.removeItem(path);
    }

    private clear(): void {
        this.local.clear();
    }
}
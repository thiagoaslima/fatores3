/// <reference path="../../typings/lz-string/lz-string.d.ts" />
export default class Storage {
    static IID: string;
    static $inject: string[];
    private LZString;
    private local;
    private prefix;
    constructor($window: ng.IWindowService);
    private init();
    private compact(value);
    private descompact(value);
    write(path: string, values: any): void;
    read(path: string): any;
    private remove(path);
    private clear();
}

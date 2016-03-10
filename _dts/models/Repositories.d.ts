/// <reference path="../../typings/fatores/models.d.ts" />
export interface IMap<T> {
    [Id: number]: T;
}
export interface IRepository<T extends fatores.models.IModel> {
    register: (items: T[]) => void;
    get: (ids: number[], sort?: boolean) => Array<T>;
    getAll: (sort?: boolean) => Array<T>;
}
export interface ITreeRepository<T extends fatores.models.ITree> extends IRepository<T> {
    register: (items: T[]) => void;
    registerChild: (parentId: number, childId: number) => void;
    unregisterChild: (parent: number, childId: number) => void;
    get: (ids: number[], sort?: boolean) => Array<T>;
    getFromRoot: (ids: number[]) => T[];
}
export declare class Repository<T extends fatores.models.IModel> implements IRepository<T> {
    protected _map: IMap<T>;
    protected sort: (a: T, b: T) => number;
    constructor(sortProperty?: string);
    register(items: T[]): void;
    get(ids: number[], sort?: boolean): T[];
    getAll(sort?: boolean): T[];
}
export declare class TreeRepository<T extends fatores.models.ITree> extends Repository<T> implements ITreeRepository<T> {
    protected parentProperty: string;
    protected _map: IMap<T>;
    private basicTreeObj;
    constructor(parentProperty: string, sortProperty?: string);
    register(items: T[]): void;
    registerChild(parentId: number, id: number): void;
    unregisterChild(parentId: number, id: number): void;
    getFromRoot(ids: number[]): T[];
}

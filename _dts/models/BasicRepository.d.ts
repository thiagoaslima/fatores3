import Storage from "../storage/Storage";
export interface IBasicModel {
    Id: number;
    DataAtualizacao: string;
}
export interface ITreeModel extends IBasicModel {
    Id: number;
    DataAtualizacao: string;
    children: number[];
    registerChild(...ids: number[]): void;
}
export declare class BasicModel implements IBasicModel {
    Id: any;
    DataAtualizacao: any;
    constructor({Id, DataAtualizacao}?: {
        Id?: number;
        DataAtualizacao?: string;
    });
}
export declare class TreeModel extends BasicModel implements ITreeModel {
    children: number[];
    constructor({Id, DataAtualizacao, children}?: {
        Id?: number;
        DataAtualizacao?: string;
        children?: any[];
    });
    registerChild(...ids: number[]): void;
}
export declare type TBasicMap = Map<number, IBasicModel>;
export declare type TTreeMap = Map<number, ITreeModel>;
export interface IBasicRepository {
    repository: TBasicMap;
    register(...array: IBasicModel[]): TBasicMap;
    update(): ng.IPromise<TBasicMap>;
    get(...ids: number[]): IBasicModel[];
}
export interface ITreeRepository {
    parentProp: string;
    repository: TTreeMap;
    register(...array: ITreeModel[]): TTreeMap;
    update(): ng.IPromise<TTreeMap>;
    get(...ids: number[]): ITreeModel[];
}
export declare class BasicRepository implements IBasicRepository {
    protected $http: ng.IHttpService;
    protected $q: ng.IQService;
    protected Storage: Storage;
    static $inject: string[];
    repository: TBasicMap;
    model: typeof BasicModel;
    type: string;
    url: string;
    constructor($http: ng.IHttpService, $q: ng.IQService, Storage: Storage);
    protected init(): void;
    register(...items: IBasicModel[]): TBasicMap;
    update(): ng.IPromise<TBasicMap>;
    get(...ids: number[]): IBasicModel[];
}
export declare class TreeRepository extends BasicRepository implements ITreeRepository {
    protected $http: ng.IHttpService;
    protected $q: ng.IQService;
    protected Storage: Storage;
    static $inject: string[];
    repository: Map<number, ITreeModel>;
    model: typeof TreeModel;
    parentProp: string;
    constructor($http: ng.IHttpService, $q: ng.IQService, Storage: Storage);
    protected init(): void;
    register(...items: ITreeModel[]): TTreeMap;
    update(): ng.IPromise<TTreeMap>;
    get(...ids: number[]): ITreeModel[];
}

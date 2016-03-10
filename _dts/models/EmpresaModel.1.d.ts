import Storage from '../storage/Storage';
export declare class EmpresaModel {
    Id: number;
    RazaoSocial: string;
    Tarefas: number[];
    Obras: number[];
    DataAtualizacao: string;
    constructor({Id, RazaoSocial, Tarefas, Obras, DataAtualizacao}: {
        Id?: number;
        RazaoSocial?: string;
        Tarefas?: any[];
        Obras?: any[];
        DataAtualizacao?: string;
    });
}
export interface IRepositoryMap {
    [Id: number]: EmpresaModel;
}
export interface IEmpresaRepository {
    repository: IRepositoryMap;
    init(): void;
    register(...array: EmpresaModel[]): IRepositoryMap;
    update(): ng.IPromise<IRepositoryMap>;
    get(...ids: number[]): EmpresaModel[];
}
export declare class EmpresaRepository implements IEmpresaRepository {
    private $http;
    private $q;
    private Storage;
    static IID: string;
    static $inject: string[];
    repository: IRepositoryMap;
    private type;
    private url;
    constructor($http: ng.IHttpService, $q: ng.IQService, Storage: Storage);
    init(): void;
    register(...empresas: EmpresaModel[]): IRepositoryMap;
    update(): ng.IPromise<IRepositoryMap>;
    get(...ids: number[]): EmpresaModel[];
}

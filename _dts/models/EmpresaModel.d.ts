import { IBasicModel, BasicModel, BasicRepository } from "./BasicRepository";
import Storage from "../storage/Storage";
export interface IEmpresaModel extends IBasicModel {
    Id: number;
    RazaoSocial: string;
    Tarefas: number[];
    Obras: number[];
    DataAtualizacao: string;
}
export declare class EmpresaModel extends BasicModel implements IEmpresaModel {
    Id: number;
    RazaoSocial: string;
    Tarefas: number[];
    Obras: number[];
    DataAtualizacao: string;
    constructor({Id, RazaoSocial, Tarefas, Obras, DataAtualizacao}?: {
        Id?: number;
        RazaoSocial?: string;
        Tarefas?: any[];
        Obras?: any[];
        DataAtualizacao?: string;
    });
}
export declare class EmpresaRepository extends BasicRepository {
    protected $http: ng.IHttpService;
    protected $q: ng.IQService;
    protected Storage: Storage;
    static IID: string;
    model: typeof EmpresaModel;
    type: string;
    url: string;
    constructor($http: ng.IHttpService, $q: ng.IQService, Storage: Storage);
}

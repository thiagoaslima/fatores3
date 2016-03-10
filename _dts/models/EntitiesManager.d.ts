/// <reference path="../../typings/fatores/models.d.ts" />
import Storage from "../storage/Storage";
import { Repository } from "./Repositories";
export declare class EntitiesLoader {
    protected $http: ng.IHttpService;
    protected $q: ng.IQService;
    protected Storage: Storage;
    static IID: string;
    static $inject: string[];
    atividades: AtividadeLoader<fatores.models.IAtividade>;
    atividadesTarefa: AtividadeTarefaLoader<{}>;
    cenarios: CenarioLoader<{}>;
    cenariosValor: CenarioValorLoader<{}>;
    empresas: EmpresaLoader<{}>;
    funcoes: FuncaoLoader<{}>;
    obras: ObraLoader<{}>;
    tarefas: TarefaLoader<{}>;
    type: string;
    state: {
        DataAtualizacao: string;
    };
    constructor($http: ng.IHttpService, $q: ng.IQService, Storage: Storage);
    init(): void;
    update(): ng.IPromise<any>;
}
export declare class BasicLoader<M extends fatores.models.IModel> {
    protected $http: ng.IHttpService;
    protected Storage: Storage;
    url: string;
    type: string;
    repository: Repository<M>;
    constructor($http: ng.IHttpService, Storage: Storage);
    init(): void;
    update(date: any): ng.IPromise<Repository<M>>;
}
export declare class TreeLoader<M extends fatores.models.ITree> extends BasicLoader<M> {
    protected $http: ng.IHttpService;
    protected Storage: Storage;
    constructor($http: ng.IHttpService, Storage: Storage);
}
export declare class AtividadeLoader<M extends fatores.models.IAtividade> extends TreeLoader<M> {
    protected $http: ng.IHttpService;
    protected Storage: Storage;
    static IID: string;
    static $inject: string[];
    url: string;
    type: string;
    constructor($http: ng.IHttpService, Storage: Storage);
}
export declare class AtividadeTarefaLoader<M> extends BasicLoader<fatores.models.IAtividadeTarefa> {
    protected $http: ng.IHttpService;
    protected Storage: Storage;
    static IID: string;
    static $inject: string[];
    url: string;
    type: string;
    constructor($http: ng.IHttpService, Storage: Storage);
}
export declare class CenarioLoader<M> extends BasicLoader<fatores.models.ICenario> {
    protected $http: ng.IHttpService;
    protected Storage: Storage;
    static IID: string;
    static $inject: string[];
    url: string;
    type: string;
    constructor($http: ng.IHttpService, Storage: Storage);
}
export declare class CenarioValorLoader<M> extends BasicLoader<fatores.models.ICenarioValor> {
    protected $http: ng.IHttpService;
    protected Storage: Storage;
    static IID: string;
    static $inject: string[];
    url: string;
    type: string;
    constructor($http: ng.IHttpService, Storage: Storage);
}
export declare class EmpresaLoader<T> extends BasicLoader<fatores.models.IEmpresa> {
    protected $http: ng.IHttpService;
    protected Storage: Storage;
    static IID: string;
    static $inject: string[];
    repository: Repository<fatores.models.IEmpresa>;
    url: string;
    type: string;
    constructor($http: ng.IHttpService, Storage: Storage);
}
export declare class FuncaoLoader<M> extends BasicLoader<fatores.models.IFuncao> {
    protected $http: ng.IHttpService;
    protected Storage: Storage;
    static IID: string;
    static $inject: string[];
    url: string;
    type: string;
    constructor($http: ng.IHttpService, Storage: Storage);
}
export declare class ObraLoader<M> extends TreeLoader<fatores.models.IObra> {
    protected $http: ng.IHttpService;
    protected Storage: Storage;
    static IID: string;
    static $inject: string[];
    url: string;
    type: string;
    constructor($http: ng.IHttpService, Storage: Storage);
}
export declare class TarefaLoader<M> extends BasicLoader<fatores.models.ITarefa> {
    protected $http: ng.IHttpService;
    protected Storage: Storage;
    static IID: string;
    static $inject: string[];
    url: string;
    type: string;
    constructor($http: ng.IHttpService, Storage: Storage);
}

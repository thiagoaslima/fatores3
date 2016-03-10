/// <reference path="../../typings/fatores/models.d.ts" />

import { URLs } from "../core/settings";
import Storage from "../storage/Storage";
import { Repository, TreeRepository } from "./Repositories";
import { toISOString } from "../utils/dates";

export class EntitiesLoader {
    static IID = 'EntitiesLoader';
    static $inject = ['$http', '$q', Storage.IID];
    
    atividades = new AtividadeLoader(this.$http, this.Storage);
    atividadesTarefa = new AtividadeTarefaLoader(this.$http, this.Storage);
    cenarios = new CenarioLoader(this.$http, this.Storage);
    cenariosValor = new CenarioValorLoader(this.$http, this.Storage);
    empresas = new EmpresaLoader(this.$http, this.Storage);
    funcoes = new FuncaoLoader(this.$http, this.Storage);
    obras = new ObraLoader(this.$http, this.Storage);
    tarefas = new TarefaLoader(this.$http, this.Storage);
    type = 'Loader';
    state = {
        DataAtualizacao: '2000-01-01T00:00:0000'
    };
    
    constructor(protected $http: ng.IHttpService,
        protected $q: ng.IQService,
        protected Storage: Storage) {
            this.init();
        }
    
    init(): void {
        const state = this.Storage.read(this.type);
        
        if (state) {
            this.state = state;
        }
    }
    
    public update(): ng.IPromise<any> {
        const _loader = this;
        const defer = this.$q.defer();
        
        this.$q.all({
            atividades: this.atividades.update(this.state.DataAtualizacao),
            atividadesTarefa: this.atividadesTarefa.update(this.state.DataAtualizacao),
            cenarios: this.cenarios.update(this.state.DataAtualizacao),
            cenariosValor: this.cenariosValor.update(this.state.DataAtualizacao),
            empresas: this.empresas.update(this.state.DataAtualizacao),
            funcoes: this.funcoes.update(this.state.DataAtualizacao),
            obras: this.obras.update(this.state.DataAtualizacao),
            tarefas: this.tarefas.update(this.state.DataAtualizacao)
        })
        .then(resp => {
            _loader.state.DataAtualizacao = toISOString(new Date());
            _loader.Storage.write(_loader.type, _loader.state);
            
            defer.resolve(resp);
        })
        .catch(err => defer.reject(err));
        
        return defer.promise;
    }    
}    

export class BasicLoader<M extends fatores.models.IModel> {
    url: string;
    type: string;
    repository = new Repository<M>();
    
    constructor(protected $http: ng.IHttpService,
        protected Storage: Storage) {
            this.init();
        }
    
    public init(): void {
        const items: M[] = this.Storage.read(this.type);
        
        if (items) {
            this.repository.register(items);
        }
    }
    
    public update(date): ng.IPromise<Repository<M>> {
        const _loader = this;
        
        return this.$http.get(`${URLs.service}${this.url}`, {
            params: {
                identify: true,
                DataAtualizacao: date
            }
        }).then( (resp: ng.IHttpPromiseCallbackArg<M[]>) => {
            _loader.repository.register(resp.data);
            return _loader.repository;
        });
    }
}

export class TreeLoader<M extends fatores.models.ITree> extends BasicLoader<M> {
    constructor(protected $http: ng.IHttpService,
        protected Storage: Storage) {
            super($http, Storage);
        }
}

export class AtividadeLoader<M extends fatores.models.IAtividade> extends TreeLoader<M> {
    static IID = 'AtividadeLoader';
    static $inject = ['$http', Storage.IID];
    
    url = URLs.endpoints.atividades;
    type = 'atividades';
    
    constructor(protected $http: ng.IHttpService,
        protected Storage: Storage) {
            super($http, Storage);
        }
}

export class AtividadeTarefaLoader<M> extends BasicLoader<fatores.models.IAtividadeTarefa> {
    static IID = 'AtividadeTarefaLoader';
    static $inject = ['$http', Storage.IID];
    
    url = URLs.endpoints.atividadesTarefa;
    type = 'atividadesTarefa';
    
    constructor(protected $http: ng.IHttpService,
        protected Storage: Storage) {
            super($http, Storage);
        }
}

export class CenarioLoader<M> extends BasicLoader<fatores.models.ICenario> {
    static IID = 'CenarioLoader';
    static $inject = ['$http', Storage.IID];
    
    url = URLs.endpoints.cenarios;
    type = 'cenarios';
    
    constructor(protected $http: ng.IHttpService,
        protected Storage: Storage) {
            super($http, Storage);
        }
}

export class CenarioValorLoader<M> extends BasicLoader<fatores.models.ICenarioValor> {
    static IID = 'CenarioValorLoader';
    static $inject = ['$http', Storage.IID];
    
    url = URLs.endpoints.cenariosValor;
    type = 'cenariosValor';
    
    constructor(protected $http: ng.IHttpService,
        protected Storage: Storage) {
            super($http, Storage);
        }
}

export class EmpresaLoader<T> extends BasicLoader<fatores.models.IEmpresa> {
    static IID = 'EmpresaLoader';
    static $inject = ['$http', Storage.IID];
    
    repository = new Repository<fatores.models.IEmpresa>('RazaoSocial');
    url = URLs.endpoints.empresas;
    type = 'empresas';
    
    constructor(protected $http: ng.IHttpService,
        protected Storage: Storage) {
            super($http, Storage);
        }
}

export class FuncaoLoader<M> extends BasicLoader<fatores.models.IFuncao> {
    static IID = 'FuncaoLoader';
    static $inject = ['$http', Storage.IID];
    
    url = URLs.endpoints.funcoes;
    type = 'funcoes';
    
    constructor(protected $http: ng.IHttpService,
        protected Storage: Storage) {
            super($http, Storage);
        }
}

export class ObraLoader<M> extends TreeLoader<fatores.models.IObra> {
    static IID = 'ObraLoader';
    static $inject = ['$http', Storage.IID];
    
    url = URLs.endpoints.obras;
    type = 'obras';
    
    constructor(protected $http: ng.IHttpService,
        protected Storage: Storage) {
            super($http, Storage);
        }
}

export class TarefaLoader<M> extends BasicLoader<fatores.models.ITarefa> {
    static IID = 'TarefaLoader';
    static $inject = ['$http', Storage.IID];
    
    url = URLs.endpoints.tarefas;
    type = 'tarefas';
    
    constructor(protected $http: ng.IHttpService,
        protected Storage: Storage) {
            super($http, Storage);
        }
}
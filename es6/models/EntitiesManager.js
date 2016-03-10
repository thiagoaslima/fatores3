/// <reference path="../../typings/fatores/models.d.ts" />
import { URLs } from "../core/settings";
import Storage from "../storage/Storage";
import { Repository } from "./Repositories";
import { toISOString } from "../utils/dates";
export class EntitiesLoader {
    constructor($http, $q, Storage) {
        this.$http = $http;
        this.$q = $q;
        this.Storage = Storage;
        this.atividades = new AtividadeLoader(this.$http, this.Storage);
        this.atividadesTarefa = new AtividadeTarefaLoader(this.$http, this.Storage);
        this.cenarios = new CenarioLoader(this.$http, this.Storage);
        this.cenariosValor = new CenarioValorLoader(this.$http, this.Storage);
        this.empresas = new EmpresaLoader(this.$http, this.Storage);
        this.funcoes = new FuncaoLoader(this.$http, this.Storage);
        this.obras = new ObraLoader(this.$http, this.Storage);
        this.tarefas = new TarefaLoader(this.$http, this.Storage);
        this.type = 'Loader';
        this.state = {
            DataAtualizacao: '2000-01-01T00:00:0000'
        };
        this.init();
    }
    init() {
        const state = this.Storage.read(this.type);
        if (state) {
            this.state = state;
        }
    }
    update() {
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
EntitiesLoader.IID = 'EntitiesLoader';
EntitiesLoader.$inject = ['$http', '$q', Storage.IID];
export class BasicLoader {
    constructor($http, Storage) {
        this.$http = $http;
        this.Storage = Storage;
        this.repository = new Repository();
        this.init();
    }
    init() {
        const items = this.Storage.read(this.type);
        if (items) {
            this.repository.register(items);
        }
    }
    update(date) {
        const _loader = this;
        return this.$http.get(`${URLs.service}${this.url}`, {
            params: {
                identify: true,
                DataAtualizacao: date
            }
        }).then((resp) => {
            _loader.repository.register(resp.data);
            return _loader.repository;
        });
    }
}
export class TreeLoader extends BasicLoader {
    constructor($http, Storage) {
        super($http, Storage);
        this.$http = $http;
        this.Storage = Storage;
    }
}
export class AtividadeLoader extends TreeLoader {
    constructor($http, Storage) {
        super($http, Storage);
        this.$http = $http;
        this.Storage = Storage;
        this.url = URLs.endpoints.atividades;
        this.type = 'atividades';
    }
}
AtividadeLoader.IID = 'AtividadeLoader';
AtividadeLoader.$inject = ['$http', Storage.IID];
export class AtividadeTarefaLoader extends BasicLoader {
    constructor($http, Storage) {
        super($http, Storage);
        this.$http = $http;
        this.Storage = Storage;
        this.url = URLs.endpoints.atividadesTarefa;
        this.type = 'atividadesTarefa';
    }
}
AtividadeTarefaLoader.IID = 'AtividadeTarefaLoader';
AtividadeTarefaLoader.$inject = ['$http', Storage.IID];
export class CenarioLoader extends BasicLoader {
    constructor($http, Storage) {
        super($http, Storage);
        this.$http = $http;
        this.Storage = Storage;
        this.url = URLs.endpoints.cenarios;
        this.type = 'cenarios';
    }
}
CenarioLoader.IID = 'CenarioLoader';
CenarioLoader.$inject = ['$http', Storage.IID];
export class CenarioValorLoader extends BasicLoader {
    constructor($http, Storage) {
        super($http, Storage);
        this.$http = $http;
        this.Storage = Storage;
        this.url = URLs.endpoints.cenariosValor;
        this.type = 'cenariosValor';
    }
}
CenarioValorLoader.IID = 'CenarioValorLoader';
CenarioValorLoader.$inject = ['$http', Storage.IID];
export class EmpresaLoader extends BasicLoader {
    constructor($http, Storage) {
        super($http, Storage);
        this.$http = $http;
        this.Storage = Storage;
        this.repository = new Repository('RazaoSocial');
        this.url = URLs.endpoints.empresas;
        this.type = 'empresas';
    }
}
EmpresaLoader.IID = 'EmpresaLoader';
EmpresaLoader.$inject = ['$http', Storage.IID];
export class FuncaoLoader extends BasicLoader {
    constructor($http, Storage) {
        super($http, Storage);
        this.$http = $http;
        this.Storage = Storage;
        this.url = URLs.endpoints.funcoes;
        this.type = 'funcoes';
    }
}
FuncaoLoader.IID = 'FuncaoLoader';
FuncaoLoader.$inject = ['$http', Storage.IID];
export class ObraLoader extends TreeLoader {
    constructor($http, Storage) {
        super($http, Storage);
        this.$http = $http;
        this.Storage = Storage;
        this.url = URLs.endpoints.obras;
        this.type = 'obras';
    }
}
ObraLoader.IID = 'ObraLoader';
ObraLoader.$inject = ['$http', Storage.IID];
export class TarefaLoader extends BasicLoader {
    constructor($http, Storage) {
        super($http, Storage);
        this.$http = $http;
        this.Storage = Storage;
        this.url = URLs.endpoints.tarefas;
        this.type = 'tarefas';
    }
}
TarefaLoader.IID = 'TarefaLoader';
TarefaLoader.$inject = ['$http', Storage.IID];

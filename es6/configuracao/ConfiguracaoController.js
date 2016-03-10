import { Session } from "../session/Session";
class ConfigCtrl {
    constructor($scope, $state, Session) {
        this.$scope = $scope;
        this.$state = $state;
        this.Session = Session;
        this.obras = [];
        this.getObras = Session.repositorios.obras.get;
        this.selectables = {
            empresas: [],
            obras: [],
            contratadas: [],
            tarefas: []
        };
        this.selected = {};
        const _selected = {
            empresa: Session.configuracao.empresa || null,
            obra: Session.configuracao.empresa || null,
            contratada: Session.configuracao.contratada || null,
            tarefa: Session.configuracao.tarefa || null
        };
        const controller = this;
        Object.defineProperties(this.selected, {
            "empresa": {
                get: function () {
                    return _selected.empresa;
                },
                set: function (value) {
                    _selected.empresa = value || null;
                    _selected.obra = null;
                    _selected.contratada = null;
                    _selected.tarefa = null;
                    $scope.$applyAsync(() => {
                        if (value === null) {
                            controller.selectables.obras = [];
                        }
                        controller.selectables.contratadas = [];
                        controller.selectables.tarefas = [];
                    });
                }
            },
            "obra": {
                get: function () {
                    return _selected.obra;
                },
                set: function (value) {
                    _selected.obra = value || null;
                    _selected.contratada = null;
                    _selected.tarefa = null;
                    $scope.$applyAsync(() => {
                        if (value === null) {
                            controller.selectables.contratadas = [];
                        }
                        controller.selectables.tarefas = [];
                    });
                }
            },
            "contratada": {
                get: function () {
                    return _selected.contratada;
                },
                set: function (value) {
                    _selected.contratada = value || null;
                    _selected.tarefa = null;
                    $scope.$applyAsync(() => {
                        if (value === null) {
                            controller.selectables.tarefas = [];
                        }
                    });
                }
            },
            "tarefa": {
                get: function () {
                    return _selected.tarefa;
                },
                set: function (value) {
                    _selected.tarefa = value;
                }
            }
        });
        this.init();
    }
    init() {
        window.config = this;
        const empresasId = this.Session.repositorios.obras.getAll(false).map(obra => obra.EmpresaId).filter((id, idx, arr) => arr.indexOf(id) === idx);
        this.empresas = this.Session.repositorios.empresas.get(empresasId);
    }
}
ConfigCtrl.IID = 'ConfiguracaoController';
ConfigCtrl.$inject = ['$scope', '$state', Session.IID];
export { ConfigCtrl };

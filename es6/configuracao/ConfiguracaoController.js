import { Session } from "../session/Session";
class ConfigCtrl {
    constructor($scope, $state, Session) {
        this.$scope = $scope;
        this.$state = $state;
        this.Session = Session;
        this.obras = [];
        const empresasId = Session.repositorios.obras.getAll(false).map(obra => obra.EmpresaId).filter((id, idx, arr) => arr.indexOf(id) === idx);
        this.empresas = Session.repositorios.empresas.get(empresasId);
        this.selected = Session.configuracao;
        this.getObras = Session.repositorios.obras.get;
        this.init();
    }
    init() {
        this.$scope.$watch(() => this.selected.empresa, (newValue, oldValue) => {
            if (newValue !== oldValue) {
                this.obras = this.Session.repositorios.obras.get(this.selected.empresa.Obras);
            }
        });
    }
}
ConfigCtrl.IID = 'ConfiguracaoController';
ConfigCtrl.$inject = ['$scope', '$state', Session.IID];
export { ConfigCtrl };

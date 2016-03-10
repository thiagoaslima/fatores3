import { Session } from "../session/Session"

class ConfigCtrl {
    static IID = 'ConfiguracaoController';
    static $inject = ['$scope', '$state', Session.IID];

    public empresas: fatores.models.IEmpresa[];
    public obras: fatores.models.IObra[] = [];
    public selected;
    public getObras;

    constructor(private $scope: ng.IScope,
        private $state: ng.ui.IStateService,
        private Session: Session) {
        const empresasId = Session.repositorios.obras.getAll(false).map(obra => obra.EmpresaId).filter((id, idx, arr) => arr.indexOf(id) === idx);
        this.empresas = Session.repositorios.empresas.get(empresasId);
        this.selected = Session.configuracao;
        
        this.getObras = Session.repositorios.obras.get;
        
        this.init();
    }
    
    init() {
        this.$scope.$watch( () => this.selected.empresa, (newValue, oldValue) => {
            if (newValue !== oldValue) {
                this.obras = this.Session.repositorios.obras.get(this.selected.empresa.Obras);
            }
        })
    }
    
    
}

export {
ConfigCtrl
}
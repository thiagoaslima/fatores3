import { Session } from "../session/Session";
declare class ConfigCtrl {
    private $scope;
    private $state;
    private Session;
    static IID: string;
    static $inject: string[];
    empresas: fatores.models.IEmpresa[];
    obras: fatores.models.IObra[];
    selected: any;
    getObras: any;
    constructor($scope: ng.IScope, $state: ng.ui.IStateService, Session: Session);
    init(): void;
}
export { ConfigCtrl };

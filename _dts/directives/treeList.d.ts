import { Session } from '../session/Session';
export declare function TreeListDirective(): {
    scope: {};
    bindToController: {
        get: string;
        fullList: string;
        idsList: string;
        model: string;
        title: string;
    };
    compile: (element: any, attrs: any) => {
        pre: () => void;
        post: () => void;
    };
    controller: (string | typeof TreeListController)[];
    controllerAs: string;
    template: string;
};
export declare class TreeListController {
    private $scope;
    private Session;
    static IID: string;
    static $inject: string[];
    private ids;
    private items;
    private type;
    private model;
    private visible;
    private selecteds;
    private children;
    private get;
    constructor($scope: ng.IScope, Session: Session);
    watchers(): void;
    toggle(level: any): void;
    isVisible(level: any): boolean;
    select(item: any, level: any): void;
    isSelected(item: any): boolean;
}

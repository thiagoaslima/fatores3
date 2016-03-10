import { Session } from '../session/Session';
export declare function BasicListDirective(): {
    scope: {};
    bindToController: {
        items: string;
        ids: string;
        model: string;
        title: string;
        prop: string;
    };
    compile: (element: any, attrs: any) => {
        pre: () => void;
        post: () => void;
    };
    link: (scope: any, element: any, attrs: any) => void;
    controller: typeof BasicListController;
    controllerAs: string;
    template: string;
};
export declare class BasicListController {
    private $scope;
    private Session;
    static IID: string;
    static $inject: string[];
    private ids;
    private items;
    private type;
    private visible;
    private model;
    constructor($scope: ng.IScope, Session: Session);
    toggle(): void;
    isVisible(): boolean;
    select(item: any): void;
    isSelected(item: any): boolean;
}

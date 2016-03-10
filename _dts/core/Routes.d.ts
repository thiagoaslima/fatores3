/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
export declare class Router {
    $stateProvider: ng.ui.IStateProvider;
    $urlRouterProvider: ng.ui.IUrlRouterProvider;
    static $inject: string[];
    constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider);
    static instance($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider): Router;
    private run();
}
export declare function RouteVerifier($rootScope: any, $state: any, Session: any): void;

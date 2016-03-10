/// <reference path="../typings/angularjs/angular.d.ts" />

// models
import { Session } from './session/Session';

// core
import { Router, RouteVerifier} from './core/Routes';

// services
import Toast from './toaster/Toast';
import Storage from './storage/Storage';
import { UserRepository } from './models/UserModel';
import { EntitiesLoader } from './models/EntitiesManager';

// controllers
import { LoginCtrl } from './login/LoginController';
import { ConfigCtrl } from './configuracao/ConfiguracaoController';

// interceptor
import SessionInterceptor from './session/SessionInterceptor';

// directives 
import { BasicListController, BasicListDirective } from './directives/basicList';
import { TreeListController, TreeListDirective } from './directives/treeList';

angular
	.module('app.fatores', [
		'ionic',
        'ngCordova'
	])
    .service(Toast.IID, Toast)
    .service(Storage.IID, Storage)
    .service(Session.IID, Session)
    .service(UserRepository.IID, UserRepository)
    .service(EntitiesLoader.IID, EntitiesLoader)
    
    
    .controller(BasicListController.IID, BasicListController)
    .directive('basicList', BasicListDirective)
    .controller(TreeListController.IID, TreeListController)
    .directive('treeList', TreeListDirective)
    
    .controller(LoginCtrl.IID, LoginCtrl)
    .controller(ConfigCtrl.IID, ConfigCtrl)
    
    
    .service('SessionInterceptor', SessionInterceptor)
    .config(['$httpProvider', function ($httpProvider) { 
		$httpProvider.defaults.timeout = 2000;
		$httpProvider.interceptors.push('SessionInterceptor'); 
		// $httpProvider.interceptors.push('loadingStatus'); 
	}])
    
    .config(Router.instance)
    .run(RouteVerifier)
    ;

	
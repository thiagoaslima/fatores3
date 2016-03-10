/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
import login from '../login/login.template';
import { LoginCtrl } from '../login/LoginController';
import sidebar from '../sidebar/sidebar.template';
import configuracao from '../configuracao/configuracao.template';
import { ConfigCtrl } from '../configuracao/ConfiguracaoController';
import { Session } from "../session/Session";
import { EntitiesLoader } from "../models/EntitiesManager";
// import equipe from '../equipe/equipe.template';
// import recursos from '../recursos/recursos.template';
// import atividades from '../atividades/atividades.template';
// import cenarios from '../cenarios/cenarios.template';
export class Router {
    constructor($stateProvider, $urlRouterProvider) {
        this.$stateProvider = $stateProvider;
        this.$urlRouterProvider = $urlRouterProvider;
        this.run();
    }
    static instance($stateProvider, $urlRouterProvider) {
        // decorate $stateProvider
        const originalState = $stateProvider.state;
        $stateProvider.state = function (name, config) {
            if (config.restrict === undefined) {
                config.restrict = true;
            }
            return originalState(name, config);
        };
        return new Router($stateProvider, $urlRouterProvider);
    }
    run() {
        this.$stateProvider
            .state('login', {
            url: '/login',
            template: login,
            controller: LoginCtrl.IID,
            controllerAs: 'LoginCtrl',
            restrict: false
        })
            .state('menu', {
            url: '',
            abstract: true,
            template: sidebar
        })
            .state('configuracao', {
            parent: 'menu',
            url: '/configuracao',
            template: configuracao,
            controller: ConfigCtrl,
            controllerAs: 'ConfigCtrl',
            resolve: {
                "empresas": [Session.IID, EntitiesLoader.IID,
                    function (Session, EntitiesLoader) {
                        return EntitiesLoader.update().then(() => {
                            const repositories = Session.repositorios;
                            repositories.empresas.register(EntitiesLoader.empresas.repository.get(Session.user.Empresas));
                            repositories.obras.register(EntitiesLoader.obras.repository.get(Session.user.Obras));
                            repositories.tarefas.register(EntitiesLoader.tarefas.repository.get(Session.user.Tarefas));
                            return Session.repositorios;
                        });
                    }]
            }
        });
        this.$urlRouterProvider.otherwise('/login');
    }
}
Router.$inject = ['$stateProvider', '$urlRouterProvider'];
/*
function router($stateProvider, $urlRouterProvider) {
    const orig = $stateProvider.state;

    $stateProvider.state = function(name, obj) {
        if (obj.restrict === undefined) {
            obj.restrict = true;
        }
        return orig(name, obj);
    }

    const fetch = function(model, attempt = 0) {
        return model.fetch().finally(resp => {
            console.log(model.type, attempt);

            if (model.list.length) {
                return model;
            }

            if (attempt > 5) {
                throw new Error('Não foi possui recuperar dados de ' + model.type);
            }

            return fetch(model, ++attempt);
        });
    };

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    $stateProvider

        
                .state('menu', {
                    url: '/app',
                    abstract: true,
                    template: sidebar
                })
                
        


        .state('login', {
            url: '/login',
            template: login,
            // controller: 'LoginController',
            // controllerAs: 'LoginCtrl',
            restrict: false
        })


        
                .state('configuration', {
                    parent: "menu",
                    url: '/configuration',
                    views: {
                        'side-menu': {
                            template: configuration,
                            controller: 'ConfigurationController',
                            controllerAs: 'ConfigCtrl',
                            resolve: {
                                empresas: ['EmpresaModel', function(model) {
                                    return fetch(model);
                                }],
        
                                obras: ['ObraModel', function(model) {
                                    return fetch(model);
                                }],
        
                                tarefas: ['TarefaModel', function(model) {
                                    return fetch(model);
                                }],
        
                                funcoes: ['FuncaoModel', function(model) {
                                    return fetch(model);
                                }],
        
                                atividades: ['AtividadeModel', function(model) {
                                    return fetch(model);
                                }],
        
                                atividadesTarefa: ['AtividadeTarefaModel', function(model) {
                                    return fetch(model);
                                }],
        
                                cenarios: ['CenarioModel', function(model) {
                                    return fetch(model);
                                }],
        
                                cenariosValor: ['CenarioValorModel', function(model) {
                                    return fetch(model);
                                }]
                            }
                        }
                    }
                })
        
        
        
                .state('equipe', {
                    parent: "menu",
                    url: '/equipe',
                    views: {
                        'side-menu': {
                            template: equipe,
                            controller: 'EquipeController',
                            controllerAs: 'EquipeCtrl'
                        }
                    }
                })
        
        
        
        
        
                .state('recursos', {
                    parent: "menu",
                    url: '/recursos',
                    views: {
                        'side-menu': {
                            template: recursos,
                            controller: 'RecursosController',
                            controllerAs: 'RecursosCtrl'
                        }
                    }
                })
        
        
        
                .state('atividades', {
                    parent: "menu",
                    url: '/atividades',
                    views: {
                        'side-menu': {
                            template: atividades,
                            controller: 'AtividadesController',
                            controllerAs: 'AtividadesCtrl'
                        }
                    }
                })
        
        
        
                .state('cenarios', {
                    parent: "menu",
                    url: '/cenarios',
                    views: {
                        'side-menu': {
                            template: cenarios,
                            controller: 'CenariosController',
                            controllerAs: 'CenariosCtrl'
                        }
                    }
                })
        

        ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

}
*/
export function RouteVerifier($rootScope, $state, Session) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        console.log('start', arguments);
        if (toState.restrict && !Session.isSet()) {
            event.preventDefault(),
                $state.go('login');
        }
    });
    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        console.log('not found');
        console.log(unfoundState.to); // "lazy.state"
        console.log(unfoundState.toParams); // {a:1, b:2}
        console.log(unfoundState.options); // {inherit:false} + default options 
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        console.log('success', arguments);
    });
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        console.log('error', arguments);
    });
    $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
        // Access to all the view config properties.
        // and one special property 'targetView'
        // viewConfig.targetView
        console.log('loading', arguments);
    });
    $rootScope.$on('$viewContentLoaded', function (event) {
        console.log('loaded', arguments);
    });
}
RouteVerifier.$inject = ['$rootScope', '$state', Session.IID];

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Session = require('./session/Session');

var _Routes = require('./core/Routes');

var _Toast = require('./toaster/Toast');

var _Toast2 = _interopRequireDefault(_Toast);

var _Storage = require('./storage/Storage');

var _Storage2 = _interopRequireDefault(_Storage);

var _UserModel = require('./models/UserModel');

var _EntitiesManager = require('./models/EntitiesManager');

var _LoginController = require('./login/LoginController');

var _ConfiguracaoController = require('./configuracao/ConfiguracaoController');

var _SessionInterceptor = require('./session/SessionInterceptor');

var _SessionInterceptor2 = _interopRequireDefault(_SessionInterceptor);

var _basicList = require('./directives/basicList');

var _treeList = require('./directives/treeList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('app.fatores', ['ionic', 'ngCordova']).service(_Toast2.default.IID, _Toast2.default).service(_Storage2.default.IID, _Storage2.default).service(_Session.Session.IID, _Session.Session).service(_UserModel.UserRepository.IID, _UserModel.UserRepository).service(_EntitiesManager.EntitiesLoader.IID, _EntitiesManager.EntitiesLoader).controller(_basicList.BasicListController.IID, _basicList.BasicListController).directive('basicList', _basicList.BasicListDirective).controller(_treeList.TreeListController.IID, _treeList.TreeListController).directive('treeList', _treeList.TreeListDirective).controller(_LoginController.LoginCtrl.IID, _LoginController.LoginCtrl).controller(_ConfiguracaoController.ConfigCtrl.IID, _ConfiguracaoController.ConfigCtrl).service('SessionInterceptor', _SessionInterceptor2.default).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.timeout = 2000;
    $httpProvider.interceptors.push('SessionInterceptor');
    // $httpProvider.interceptors.push('loadingStatus');
}]).config(_Routes.Router.instance).run(_Routes.RouteVerifier); /// <reference path="../typings/angularjs/angular.d.ts" />

},{"./configuracao/ConfiguracaoController":2,"./core/Routes":4,"./directives/basicList":6,"./directives/treeList":7,"./login/LoginController":8,"./models/EntitiesManager":10,"./models/UserModel":12,"./session/Session":13,"./session/SessionInterceptor":14,"./storage/Storage":16,"./toaster/Toast":17}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConfigCtrl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Session = require("../session/Session");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConfigCtrl = function () {
    function ConfigCtrl($scope, $state, Session) {
        _classCallCheck(this, ConfigCtrl);

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
        var _selected = {
            empresa: Session.configuracao.empresa || null,
            obra: Session.configuracao.empresa || null,
            contratada: Session.configuracao.contratada || null,
            tarefa: Session.configuracao.tarefa || null
        };
        var controller = this;
        Object.defineProperties(this.selected, {
            "empresa": {
                get: function get() {
                    return _selected.empresa;
                },
                set: function set(value) {
                    _selected.empresa = value || null;
                    _selected.obra = null;
                    _selected.contratada = null;
                    _selected.tarefa = null;
                    $scope.$applyAsync(function () {
                        if (value === null) {
                            controller.selectables.obras = [];
                        }
                        controller.selectables.contratadas = [];
                        controller.selectables.tarefas = [];
                    });
                }
            },
            "obra": {
                get: function get() {
                    return _selected.obra;
                },
                set: function set(value) {
                    _selected.obra = value || null;
                    _selected.contratada = null;
                    _selected.tarefa = null;
                    $scope.$applyAsync(function () {
                        if (value === null) {
                            controller.selectables.contratadas = [];
                        }
                        controller.selectables.tarefas = [];
                    });
                }
            },
            "contratada": {
                get: function get() {
                    return _selected.contratada;
                },
                set: function set(value) {
                    _selected.contratada = value || null;
                    _selected.tarefa = null;
                    $scope.$applyAsync(function () {
                        if (value === null) {
                            controller.selectables.tarefas = [];
                        }
                    });
                }
            },
            "tarefa": {
                get: function get() {
                    return _selected.tarefa;
                },
                set: function set(value) {
                    _selected.tarefa = value;
                }
            }
        });
        this.init();
    }

    _createClass(ConfigCtrl, [{
        key: "init",
        value: function init() {
            window.config = this;
            var empresasId = this.Session.repositorios.obras.getAll(false).map(function (obra) {
                return obra.EmpresaId;
            }).filter(function (id, idx, arr) {
                return arr.indexOf(id) === idx;
            });
            this.empresas = this.Session.repositorios.empresas.get(empresasId);
        }
    }]);

    return ConfigCtrl;
}();

ConfigCtrl.IID = 'ConfiguracaoController';
ConfigCtrl.$inject = ['$scope', '$state', _Session.Session.IID];
exports.ConfigCtrl = ConfigCtrl;

},{"../session/Session":13}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n<ion-view title=\"Configuração\">\n    <ion-nav-buttons side=\"right\">\n        <button class=\"icon button button-balanced ion-checkmark\" \n            ng-show=\"ConfigCtrl.selected.tarefa\"\n            ng-click=\"ConfigCtrl.save($event)\"></button>\n    </ion-nav-buttons>\n\n    <ion-content overflow-scroll=\"true\" padding=\"'true'\" class=\"has-header\">\n        \n        <!-- Empresas -->\n        <basic-list title=\"Empresas\" \n                    prop=\"RazaoSocial\"\n                    items=\"ConfigCtrl.empresas\"  \n                    model=\"ConfigCtrl.selected.empresa\">\n        </basic-list>\n        \n        <!-- Obras -->\n        <tree-list  title=\"Obras\"\n                    repo=\"ConfigCtrl.getObras\" \n                    model=\"ConfigCtrl.selected.obra\"\n                    items=\"ConfigCtrl.obras\"\n                    items-ids=\"ConfigCtrl.selected.empresa.Obras\">\n        </tree-list>\n        \n    </ion-content>\n</ion-view>\n";

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Router = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />


exports.RouteVerifier = RouteVerifier;

var _login = require('../login/login.template');

var _login2 = _interopRequireDefault(_login);

var _LoginController = require('../login/LoginController');

var _sidebar = require('../sidebar/sidebar.template');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _configuracao = require('../configuracao/configuracao.template');

var _configuracao2 = _interopRequireDefault(_configuracao);

var _ConfiguracaoController = require('../configuracao/ConfiguracaoController');

var _Session = require('../session/Session');

var _EntitiesManager = require('../models/EntitiesManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import equipe from '../equipe/equipe.template';
// import recursos from '../recursos/recursos.template';
// import atividades from '../atividades/atividades.template';
// import cenarios from '../cenarios/cenarios.template';

var Router = exports.Router = function () {
    function Router($stateProvider, $urlRouterProvider) {
        _classCallCheck(this, Router);

        this.$stateProvider = $stateProvider;
        this.$urlRouterProvider = $urlRouterProvider;
        this.run();
    }

    _createClass(Router, [{
        key: 'run',
        value: function run() {
            this.$stateProvider.state('login', {
                url: '/login',
                template: _login2.default,
                controller: _LoginController.LoginCtrl.IID,
                controllerAs: 'LoginCtrl',
                restrict: false
            }).state('menu', {
                url: '',
                abstract: true,
                template: _sidebar2.default
            }).state('configuracao', {
                parent: 'menu',
                url: '/configuracao',
                template: _configuracao2.default,
                controller: _ConfiguracaoController.ConfigCtrl,
                controllerAs: 'ConfigCtrl',
                resolve: {
                    "empresas": [_Session.Session.IID, _EntitiesManager.EntitiesLoader.IID, function (Session, EntitiesLoader) {
                        return EntitiesLoader.update().then(function () {
                            var repositories = Session.repositorios;
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
    }], [{
        key: 'instance',
        value: function instance($stateProvider, $urlRouterProvider) {
            // decorate $stateProvider
            var originalState = $stateProvider.state;
            $stateProvider.state = function (name, config) {
                if (config.restrict === undefined) {
                    config.restrict = true;
                }
                return originalState(name, config);
            };
            return new Router($stateProvider, $urlRouterProvider);
        }
    }]);

    return Router;
}();

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
function RouteVerifier($rootScope, $state, Session) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        console.log('start', arguments);
        if (toState.restrict && !Session.isSet()) {
            event.preventDefault(), $state.go('login');
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
RouteVerifier.$inject = ['$rootScope', '$state', _Session.Session.IID];

},{"../configuracao/ConfiguracaoController":2,"../configuracao/configuracao.template":3,"../login/LoginController":8,"../login/login.template":9,"../models/EntitiesManager":10,"../session/Session":13,"../sidebar/sidebar.template":15}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var URLs = exports.URLs = {
    // services: 'http://localhost:4720',
    service: 'https://fatoresweb.azurewebsites.net/api/v1',
    endpoints: {
        atividades: '/atividade',
        atividadesTarefa: '/atividadetarefa',
        cenarios: '/cenario',
        cenariosValor: '/cenariovalor',
        contextos: '/cenariodia',
        empresas: '/empresa',
        funcoes: '/funcao',
        obras: '/obra',
        producao: '/producao',
        recursos: '/levantamento',
        tarefas: '/tarefa',
        token: '/token'
    }
};
var app = exports.app = {
    version: '0.3.0'
};

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BasicListController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.BasicListDirective = BasicListDirective;

var _Session = require('../session/Session');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uiid = 0;
function BasicListDirective() {
    return {
        scope: {},
        bindToController: {
            items: '=',
            ids: '=',
            model: '=',
            title: '@',
            prop: '@'
        },
        compile: function compile(element, attrs) {
            var num = uiid++;
            var name = attrs.title;
            var radio = element.find('ion-radio');
            radio.attr('name', name + '_' + num);
            return {
                pre: function pre() {},
                post: function post() {}
            };
        },
        link: function link(scope, element, attrs) {
            var name = attrs.title;
            angular.element(element).attr('name', name);
        },
        controller: BasicListController,
        controllerAs: 'BasicList',
        template: '\n        <ion-list class="padding-top">\n            \n            <ion-item>\n                <h4 ng-click="BasicList.toggle()" class="item item-divider">\n                    {{::BasicList.title}}\n                </h4>\n                <div style="font-style:italic" ng-hide="BasicList.isVisible()">\n                    <ion-item ng-click="BasicList.toggle()" ng-if="BasicList.model">{{BasicList.model[BasicList.prop]}}</ion-item>\n                    <ion-item ng-click="BasicList.toggle()" ng-if="!BasicList.model">Clique para selecionar um item</ion-item>\n                </div>\n                <ion-list ng-show="BasicList.isVisible()">\n                    <ion-radio ng-repeat="item in BasicList.items"\n                        ng-value="item"\n                        ng-selected="BasicList.isSelected(item)"\n                        ng-click="BasicList.select(item)">\n                            {{::item[BasicList.prop]}}\n                    </ion-radio>\n                </ion-list>\n            </ion-item>\n       </ion-list>\n        '
    };
}

var BasicListController = exports.BasicListController = function () {
    function BasicListController($scope, Session) {
        var _this = this;

        _classCallCheck(this, BasicListController);

        this.$scope = $scope;
        this.Session = Session;
        this.visible = false;
        this.$scope.$watch(function () {
            return _this.ids.length ? parseInt(_this.ids.join(''), 10) : 0;
        }, function (newValue, oldValue) {
            if (!!newValue && newValue !== oldValue) {
                _this.items = _this.Session.repositorios[_this.type];
            }
        });
        if (!this.type) {
            this.type = "";
        }
        if (!this.model) {
            this.model = null;
        }
        if (!this.items) {
            this.items = [];
        }
        if (!this.ids) {
            this.ids = [];
        }
    }

    _createClass(BasicListController, [{
        key: 'toggle',
        value: function toggle() {
            this.visible = !this.visible;
        }
    }, {
        key: 'isVisible',
        value: function isVisible() {
            return this.visible;
        }
    }, {
        key: 'select',
        value: function select(item) {
            this.model = item;
            this.toggle();
        }
    }, {
        key: 'isSelected',
        value: function isSelected(item) {
            return item === this.model;
        }
    }]);

    return BasicListController;
}();

BasicListController.IID = 'BasicListController';
BasicListController.$inject = ['$scope', _Session.Session.IID];

},{"../session/Session":13}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeListController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* globals angular:true */


exports.TreeListDirective = TreeListDirective;

var _Session = require('../session/Session');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uiid = 0;
function TreeListDirective() {
    return {
        scope: {},
        bindToController: {
            get: '&repo',
            fullList: '=items',
            idsList: '=itemsIds',
            model: '=',
            title: '@'
        },
        compile: function compile(element, attrs) {
            var num = uiid;
            var name = attrs.title;
            var names = {
                lvl0: name + '_parent_' + num,
                lvl1: name + '_lvl1_' + num,
                lvl2: name + '_lvl2_' + num,
                lvl3: name + '_lvl3_' + num
            };
            var radios = element.find('ion-radio');
            Array.prototype.forEach.call(radios, function (el, idx) {
                return angular.element(el).attr('name', names['lvl' + idx]);
            });
            return {
                pre: function pre() {},
                post: function post() {}
            };
        },
        controller: ['$scope', '$element', TreeListController],
        controllerAs: 'TreeList',
        template: '\n         <ion-list class="padding-top">\n            \n            <ion-item>\n                <h4 class="item item-divider">\n                    {{::TreeList.title}}\n                </h4>\n                <div>\n                    <ion-item ng-if="!TreeList.model">Clique para selecionar um item</ion-item>\n                </div>\n                \n                \n                <-- LVL 0 -->\n                <ion-list ng-if="TreeList.items.length">\n                    <ion-item ng-hide="TreeList.isVisible(0)"\n                        ng-click="TreeList.toggle(0)">\n                        {{TreeList.selecteds[0][TreeList.prop]}}\n                    </ion-item>\n                    <ion-radio ng-repeat="item in TreeList.items"\n                        ng-value="item"\n                        ng-show="TreeList.isVisible(0)"\n                        ng-selected="TreeList.isSelected(item)"\n                        ng-click="TreeList.select(item, 0)">\n                            {{::item[TreeList.prop]}}\n                    </ion-radio>\n                </ion-list>\n                \n                \n                \n                <-- LVL 1 -->\n                <ion-list ng-if="TreeList.selecteds[1] === item">\n                    <ion-item ng-if="TreeList.selecteds[1]"\n                        ng-hide="TreeList.isVisible(1)"\n                        ng-click="TreeList.toggle(1)">\n                        {{TreeList.selecteds[1][TreeList.prop]}}\n                    </ion-item>\n                    <ion-radio ng-repeat="item in TreeList.children[0]"\n                        ng-value="item"\n                        ng-show="TreeList.isVisible(1)"\n                        ng-selected="TreeList.isSelected(item)"\n                        ng-click="TreeList.select(item, 1)">\n                            {{::item[TreeList.prop]}}\n                    </ion-radio>\n                </ion-list>\n                \n                \n                \n                <-- LVL 2 -->\n                <ion-list ng-if="TreeList.selecteds[2] === item">\n                    <ion-item ng-if="TreeList.selecteds[2]"\n                        ng-hide="TreeList.isVisible(2)"\n                        ng-click="TreeList.toggle(2)">\n                        {{TreeList.selecteds[2][TreeList.prop]}}\n                    </ion-item>\n                    <ion-radio ng-repeat="item in TreeList.children[1]"\n                        ng-value="item"\n                        ng-show="TreeList.isVisible(2)"\n                        ng-selected="TreeList.isSelected(item)"\n                        ng-click="TreeList.select(item, 2)">\n                            {{::item[TreeList.prop]}}\n                    </ion-radio>\n                </ion-list>\n                \n                \n                <-- LVL 3 -->\n                <ion-list ng-if="TreeList.selecteds[3] === item">\n                    <ion-item ng-if="TreeList.selecteds[3]"\n                        ng-hide="TreeList.isVisible(3)"\n                        ng-click="TreeList.toggle(3)">\n                        {{TreeList.selecteds[3][TreeList.prop]}}\n                    </ion-item>\n                    <ion-radio ng-repeat="item in TreeList.children[2]"\n                        ng-value="item"\n                        ng-show="TreeList.isVisible(3)"\n                        ng-selected="TreeList.isSelected(item)"\n                        ng-click="TreeList.select(item, 3)">\n                            {{::item[TreeList.prop]}}\n                    </ion-radio>\n                </ion-list>\n                \n                \n            </ion-item>\n       </ion-list>\n        '
    };
}

var TreeListController = exports.TreeListController = function () {
    function TreeListController($scope, Session) {
        _classCallCheck(this, TreeListController);

        this.$scope = $scope;
        this.Session = Session;
        this.visible = [true, false, false, false];
        this.selecteds = [];
        this.children = [];
        this.get = null;
        if (!this.type) {
            this.type = "";
        }
        if (!this.model) {
            this.model = null;
        }
        if (!this.items) {
            this.items = [];
        }
        if (!this.ids) {
            this.ids = [];
        }
        this.watchers();
    }

    _createClass(TreeListController, [{
        key: 'watchers',
        value: function watchers() {
            var _this = this;

            this.$scope.$watch(function () {
                debugger;
                return _this.ids.length ? parseInt(_this.ids.join(''), 10) : 0;
            }, function (newValue, oldValue) {
                if (!!newValue && newValue !== oldValue) {
                    _this.items = _this.Session.repositorios[_this.type].get(_this.ids);
                }
            });
        }
    }, {
        key: 'toggle',
        value: function toggle(level) {
            var allHidden = [false, false, false, false];
            allHidden[level] = !this.visible[level];
            this.visible = allHidden;
        }
    }, {
        key: 'isVisible',
        value: function isVisible(level) {
            return this.visible[level];
        }
    }, {
        key: 'select',
        value: function select(item, level) {
            if (this.selecteds.length > level) {
                this.selecteds.length = level;
                this.children.length = level;
            }
            this.model = !item.children.length ? item : null;
            this.selecteds.push(item);
            this.children.push(this.get(item.children));
        }
    }, {
        key: 'isSelected',
        value: function isSelected(item) {
            return item === this.model;
        }
    }]);

    return TreeListController;
}();

TreeListController.IID = 'TreeListController';
TreeListController.$inject = ['$scope', _Session.Session.IID];

},{"../session/Session":13}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoginCtrl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Toast = require('../toaster/Toast');

var _Toast2 = _interopRequireDefault(_Toast);

var _Session = require('../session/Session');

var _UserModel = require('../models/UserModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginCtrl = exports.LoginCtrl = function () {
    function LoginCtrl($state, Toast, Session, UserRepository) {
        _classCallCheck(this, LoginCtrl);

        this.$state = $state;
        this.Toast = Toast;
        this.Session = Session;
        this.UserRepository = UserRepository;
    }

    _createClass(LoginCtrl, [{
        key: '_log',
        value: function _log(user) {
            this.Session.start(user);
            this.$state.go('configuracao');
        }
    }, {
        key: 'login',
        value: function login(evt, UserName, Password) {
            var _this = this;

            var log = this._log.bind(this);
            var offline = function offline() {
                var check = _this.UserRepository.checkCredentials(UserName, Password);
                if (check) {
                    return log(check);
                } else {
                    _this.reset();
                    _this.Toast.show('Não foi possível realizar seu login. Por favor, confira nome de usuário e senha e tente novamente.');
                }
            };
            this.UserRepository.checkOnline(UserName, Password).then(log).catch(offline);
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.UserName = '';
            this.Password = '';
        }
    }]);

    return LoginCtrl;
}();

LoginCtrl.IID = 'LoginController';
LoginCtrl.$inject = ['$state', _Toast2.default.IID, _Session.Session.IID, _UserModel.UserRepository.IID];

},{"../models/UserModel":12,"../session/Session":13,"../toaster/Toast":17}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n<ion-view title=\"Login\">\n    <ion-content overflow-scroll=\"true\" padding=\"'true'\" class=\"has-header\">\n        <div class=\"bar-balanced\">\n            <i class=\"icon ion-image\"></i>\n        </div>\n\n        <form novalidate class=\"list\">\n            <ion-list>\n                <label class=\"item item-input\">\n                    <span class=\"input-label\">Usuário</span>\n                    <input ng-model=\"LoginCtrl.UserName\" type=\"text\" placeholder=\"\">\n                </label>\n                <label class=\"item item-input\">\n                    <span class=\"input-label\">Senha</span>\n                    <input ng-model=\"LoginCtrl.Password\" type=\"password\" placeholder=\"\">\n                </label>\n            </ion-list>\n            <div class=\"spacer\" style=\"height: 40px;\"></div>\n            <button type=\"submit\" class=\"button button-balanced button-block\"\n            ng-click=\"LoginCtrl.login($event, LoginCtrl.UserName, LoginCtrl.Password)\">Entrar</button>\n        </form>\n\t\t\n    </ion-content>\n</ion-view>\n";

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TarefaLoader = exports.ObraLoader = exports.FuncaoLoader = exports.EmpresaLoader = exports.CenarioValorLoader = exports.CenarioLoader = exports.AtividadeTarefaLoader = exports.AtividadeLoader = exports.TreeLoader = exports.BasicLoader = exports.EntitiesLoader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /// <reference path="../../typings/fatores/models.d.ts" />


var _settings = require("../core/settings");

var _Storage = require("../storage/Storage");

var _Storage2 = _interopRequireDefault(_Storage);

var _Repositories = require("./Repositories");

var _dates = require("../utils/dates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntitiesLoader = exports.EntitiesLoader = function () {
    function EntitiesLoader($http, $q, Storage) {
        _classCallCheck(this, EntitiesLoader);

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

    _createClass(EntitiesLoader, [{
        key: "init",
        value: function init() {
            var state = this.Storage.read(this.type);
            if (state) {
                this.state = state;
            }
        }
    }, {
        key: "update",
        value: function update() {
            var _loader = this;
            var defer = this.$q.defer();
            this.$q.all({
                atividades: this.atividades.update(this.state.DataAtualizacao),
                atividadesTarefa: this.atividadesTarefa.update(this.state.DataAtualizacao),
                cenarios: this.cenarios.update(this.state.DataAtualizacao),
                cenariosValor: this.cenariosValor.update(this.state.DataAtualizacao),
                empresas: this.empresas.update(this.state.DataAtualizacao),
                funcoes: this.funcoes.update(this.state.DataAtualizacao),
                obras: this.obras.update(this.state.DataAtualizacao),
                tarefas: this.tarefas.update(this.state.DataAtualizacao)
            }).then(function (resp) {
                _loader.state.DataAtualizacao = (0, _dates.toISOString)(new Date());
                _loader.Storage.write(_loader.type, _loader.state);
                defer.resolve(resp);
            }).catch(function (err) {
                return defer.reject(err);
            });
            return defer.promise;
        }
    }]);

    return EntitiesLoader;
}();

EntitiesLoader.IID = 'EntitiesLoader';
EntitiesLoader.$inject = ['$http', '$q', _Storage2.default.IID];

var BasicLoader = exports.BasicLoader = function () {
    function BasicLoader($http, Storage) {
        _classCallCheck(this, BasicLoader);

        this.$http = $http;
        this.Storage = Storage;
        this.repository = new _Repositories.Repository();
        this.init();
    }

    _createClass(BasicLoader, [{
        key: "init",
        value: function init() {
            var items = this.Storage.read(this.type);
            if (items) {
                this.repository.register(items);
            }
        }
    }, {
        key: "update",
        value: function update(date) {
            var _loader = this;
            return this.$http.get("" + _settings.URLs.service + this.url, {
                params: {
                    identify: true,
                    DataAtualizacao: date
                }
            }).then(function (resp) {
                _loader.repository.register(resp.data);
                return _loader.repository;
            });
        }
    }]);

    return BasicLoader;
}();

var TreeLoader = exports.TreeLoader = function (_BasicLoader) {
    _inherits(TreeLoader, _BasicLoader);

    function TreeLoader($http, Storage) {
        _classCallCheck(this, TreeLoader);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TreeLoader).call(this, $http, Storage));

        _this.$http = $http;
        _this.Storage = Storage;
        return _this;
    }

    return TreeLoader;
}(BasicLoader);

var AtividadeLoader = exports.AtividadeLoader = function (_TreeLoader) {
    _inherits(AtividadeLoader, _TreeLoader);

    function AtividadeLoader($http, Storage) {
        _classCallCheck(this, AtividadeLoader);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(AtividadeLoader).call(this, $http, Storage));

        _this2.$http = $http;
        _this2.Storage = Storage;
        _this2.url = _settings.URLs.endpoints.atividades;
        _this2.type = 'atividades';
        return _this2;
    }

    return AtividadeLoader;
}(TreeLoader);

AtividadeLoader.IID = 'AtividadeLoader';
AtividadeLoader.$inject = ['$http', _Storage2.default.IID];

var AtividadeTarefaLoader = exports.AtividadeTarefaLoader = function (_BasicLoader2) {
    _inherits(AtividadeTarefaLoader, _BasicLoader2);

    function AtividadeTarefaLoader($http, Storage) {
        _classCallCheck(this, AtividadeTarefaLoader);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(AtividadeTarefaLoader).call(this, $http, Storage));

        _this3.$http = $http;
        _this3.Storage = Storage;
        _this3.url = _settings.URLs.endpoints.atividadesTarefa;
        _this3.type = 'atividadesTarefa';
        return _this3;
    }

    return AtividadeTarefaLoader;
}(BasicLoader);

AtividadeTarefaLoader.IID = 'AtividadeTarefaLoader';
AtividadeTarefaLoader.$inject = ['$http', _Storage2.default.IID];

var CenarioLoader = exports.CenarioLoader = function (_BasicLoader3) {
    _inherits(CenarioLoader, _BasicLoader3);

    function CenarioLoader($http, Storage) {
        _classCallCheck(this, CenarioLoader);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(CenarioLoader).call(this, $http, Storage));

        _this4.$http = $http;
        _this4.Storage = Storage;
        _this4.url = _settings.URLs.endpoints.cenarios;
        _this4.type = 'cenarios';
        return _this4;
    }

    return CenarioLoader;
}(BasicLoader);

CenarioLoader.IID = 'CenarioLoader';
CenarioLoader.$inject = ['$http', _Storage2.default.IID];

var CenarioValorLoader = exports.CenarioValorLoader = function (_BasicLoader4) {
    _inherits(CenarioValorLoader, _BasicLoader4);

    function CenarioValorLoader($http, Storage) {
        _classCallCheck(this, CenarioValorLoader);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(CenarioValorLoader).call(this, $http, Storage));

        _this5.$http = $http;
        _this5.Storage = Storage;
        _this5.url = _settings.URLs.endpoints.cenariosValor;
        _this5.type = 'cenariosValor';
        return _this5;
    }

    return CenarioValorLoader;
}(BasicLoader);

CenarioValorLoader.IID = 'CenarioValorLoader';
CenarioValorLoader.$inject = ['$http', _Storage2.default.IID];

var EmpresaLoader = exports.EmpresaLoader = function (_BasicLoader5) {
    _inherits(EmpresaLoader, _BasicLoader5);

    function EmpresaLoader($http, Storage) {
        _classCallCheck(this, EmpresaLoader);

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(EmpresaLoader).call(this, $http, Storage));

        _this6.$http = $http;
        _this6.Storage = Storage;
        _this6.repository = new _Repositories.Repository('RazaoSocial');
        _this6.url = _settings.URLs.endpoints.empresas;
        _this6.type = 'empresas';
        return _this6;
    }

    return EmpresaLoader;
}(BasicLoader);

EmpresaLoader.IID = 'EmpresaLoader';
EmpresaLoader.$inject = ['$http', _Storage2.default.IID];

var FuncaoLoader = exports.FuncaoLoader = function (_BasicLoader6) {
    _inherits(FuncaoLoader, _BasicLoader6);

    function FuncaoLoader($http, Storage) {
        _classCallCheck(this, FuncaoLoader);

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(FuncaoLoader).call(this, $http, Storage));

        _this7.$http = $http;
        _this7.Storage = Storage;
        _this7.url = _settings.URLs.endpoints.funcoes;
        _this7.type = 'funcoes';
        return _this7;
    }

    return FuncaoLoader;
}(BasicLoader);

FuncaoLoader.IID = 'FuncaoLoader';
FuncaoLoader.$inject = ['$http', _Storage2.default.IID];

var ObraLoader = exports.ObraLoader = function (_TreeLoader2) {
    _inherits(ObraLoader, _TreeLoader2);

    function ObraLoader($http, Storage) {
        _classCallCheck(this, ObraLoader);

        var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(ObraLoader).call(this, $http, Storage));

        _this8.$http = $http;
        _this8.Storage = Storage;
        _this8.url = _settings.URLs.endpoints.obras;
        _this8.type = 'obras';
        return _this8;
    }

    return ObraLoader;
}(TreeLoader);

ObraLoader.IID = 'ObraLoader';
ObraLoader.$inject = ['$http', _Storage2.default.IID];

var TarefaLoader = exports.TarefaLoader = function (_BasicLoader7) {
    _inherits(TarefaLoader, _BasicLoader7);

    function TarefaLoader($http, Storage) {
        _classCallCheck(this, TarefaLoader);

        var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(TarefaLoader).call(this, $http, Storage));

        _this9.$http = $http;
        _this9.Storage = Storage;
        _this9.url = _settings.URLs.endpoints.tarefas;
        _this9.type = 'tarefas';
        return _this9;
    }

    return TarefaLoader;
}(BasicLoader);

TarefaLoader.IID = 'TarefaLoader';
TarefaLoader.$inject = ['$http', _Storage2.default.IID];

},{"../core/settings":5,"../storage/Storage":16,"../utils/dates":19,"./Repositories":11}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeRepository = exports.Repository = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /// <reference path="../../typings/fatores/models.d.ts" />


var _objects = require("../utils/objects");

var _arrays = require("../utils/arrays");

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Repository = exports.Repository = function () {
    function Repository() {
        var sortProperty = arguments.length <= 0 || arguments[0] === undefined ? 'Nome' : arguments[0];

        _classCallCheck(this, Repository);

        this._map = Object.create(null);
        var sorts = {
            "Id": _arrays.sortById,
            "Nome": _arrays.sortByNome,
            "RazaoSocial": _arrays.sortByRazaoSocial,
            "default": _arrays.sortByProp
        };
        this.sort = sorts[sortProperty] ? sorts[sortProperty] : sorts.default(sortProperty);
    }

    _createClass(Repository, [{
        key: "register",
        value: function register(items) {
            var _this = this;

            items.forEach(function (item) {
                var id = item.Id;
                if (_this._map[id]) {
                    _this._map[id] = (0, _objects.assign)(_this._map[id], item);
                } else {
                    _this._map[id] = item;
                }
            });
        }
    }, {
        key: "get",
        value: function get(ids) {
            var _this2 = this;

            var sort = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            var items = ids.map(function (id) {
                return _this2._map[id];
            }).filter(function (item) {
                return !!item;
            });
            return sort ? items.sort(this.sort.bind(this)) : items;
        }
    }, {
        key: "getAll",
        value: function getAll() {
            var sort = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

            var items = (0, _objects.toArray)(this._map);
            return sort ? items.sort(this.sort.bind(this)) : items;
        }
    }]);

    return Repository;
}();

var TreeRepository = exports.TreeRepository = function (_Repository) {
    _inherits(TreeRepository, _Repository);

    function TreeRepository(parentProperty) {
        var sortProperty = arguments.length <= 1 || arguments[1] === undefined ? 'Nome' : arguments[1];

        _classCallCheck(this, TreeRepository);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(TreeRepository).call(this, sortProperty));

        _this3._map = Object.create(null);
        _this3.basicTreeObj = {
            children: []
        };
        _this3.parentProperty = parentProperty;
        return _this3;
    }

    _createClass(TreeRepository, [{
        key: "register",
        value: function register(items) {
            var _this4 = this;

            items.forEach(function (item) {
                var id = item.Id;
                if (_this4._map[id]) {
                    var oldParentId = _this4._map[id][_this4.parentProperty];
                    var newParentId = item[_this4.parentProperty];
                    _this4._map[id] = (0, _objects.assign)(_this4._map[id], item);
                    if (oldParentId !== newParentId) {
                        _this4.unregisterChild(oldParentId, item.Id);
                        _this4.registerChild(newParentId, item.Id);
                    }
                    return;
                }
                var parentId = item[_this4.parentProperty];
                _this4._map[id] = (0, _objects.assign)(item, _this4.basicTreeObj);
                _this4.registerChild(parentId, id);
            });
        }
    }, {
        key: "registerChild",
        value: function registerChild(parentId, id) {
            if (!this._map[parentId]) {
                this._map[parentId] = (0, _objects.assign)({ Id: parentId }, this.basicTreeObj);
            }
            var parent = this._map[parentId];
            this._map[parentId] = parent;
            if (parent.children.indexOf(id) === -1) {
                parent.children.push(id);
            }
            parent.children.sort();
        }
    }, {
        key: "unregisterChild",
        value: function unregisterChild(parentId, id) {
            var parent = this._map[parentId];
            var idx = parent.children.indexOf(id);
            parent.children.splice(idx, 1);
        }
    }, {
        key: "getFromRoot",
        value: function getFromRoot(ids) {
            var _this5 = this;

            var items = this.get(ids, false);
            var picked = Object.create(null);
            var parentIds = Object.create(null);
            items.forEach(function (item) {
                picked[item.Id] = item;
                parentIds[item[_this5.parentProperty]] = true;
            });
            var parents = this.get(Object.keys(parentIds).filter(function (id) {
                return !picked[id];
            }).map(parseInt), false);
            return items.concat(parents);
        }
    }]);

    return TreeRepository;
}(Repository);

},{"../utils/arrays":18,"../utils/objects":21}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserRepository = exports.UserEntity = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings = require('../core/settings');

var _objects = require('../utils/objects');

var _Storage = require('../storage/Storage');

var _Storage2 = _interopRequireDefault(_Storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserEntity = exports.UserEntity = function UserEntity() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$Token = _ref.Token;
    var Token = _ref$Token === undefined ? '' : _ref$Token;
    var _ref$UserId = _ref.UserId;
    var UserId = _ref$UserId === undefined ? '' : _ref$UserId;
    var _ref$UserName = _ref.UserName;
    var UserName = _ref$UserName === undefined ? '' : _ref$UserName;
    var _ref$Empresas = _ref.Empresas;
    var Empresas = _ref$Empresas === undefined ? [] : _ref$Empresas;
    var _ref$Obras = _ref.Obras;
    var Obras = _ref$Obras === undefined ? [] : _ref$Obras;
    var _ref$Tarefas = _ref.Tarefas;
    var Tarefas = _ref$Tarefas === undefined ? [] : _ref$Tarefas;
    var _ref$Expiracao = _ref.Expiracao;
    var Expiracao = _ref$Expiracao === undefined ? "2001-01-01T00:00:00.0000000Z" : _ref$Expiracao;
    var _ref$Password = _ref.Password;
    var Password = _ref$Password === undefined ? '' : _ref$Password;

    _classCallCheck(this, UserEntity);

    this.Token = Token;
    this.UserId = UserId;
    this.UserName = UserName;
    this.Expiracao = Expiracao;
    this.Password = Password;
    this.Empresas = Empresas;
    this.Obras = Obras;
    this.Tarefas = Tarefas;
};

;

var UserRepository = exports.UserRepository = function () {
    function UserRepository($q, $http, $window, Storage) {
        _classCallCheck(this, UserRepository);

        this.$q = $q;
        this.$http = $http;
        this.$window = $window;
        this.Storage = Storage;
        this.type = 'Users';
        this.repository = [];
        this.encrypt = function (value) {
            return $window.Crypto.SHA256(value).toString();
        };
        this.init();
    }

    _createClass(UserRepository, [{
        key: 'init',
        value: function init() {
            var savedUsers = (this.Storage.read(this.type) || []).map(function (user) {
                return new UserEntity(user);
            });
            savedUsers.length && this.registry.apply(this, _toConsumableArray(savedUsers));
        }
    }, {
        key: 'registry',
        value: function registry() {
            var _repository;

            (_repository = this.repository).push.apply(_repository, arguments);
            this.Storage.write(this.type, this.repository);
        }
    }, {
        key: 'get',
        value: function get(UserId) {
            return this.repository.filter(function (user) {
                return user.UserId === UserId;
            });
        }
    }, {
        key: 'checkOnline',
        value: function checkOnline() {
            var _this = this;

            var UserName = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var Password = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            return this.$http.get(_settings.URLs.service + _settings.URLs.endpoints.token, {
                params: { UserName: UserName, Password: Password }
            }).then(function (resp) {
                if (resp.status < 200 || resp.status >= 300) {
                    debugger;
                    throw new Error(resp);
                }
                var user = new UserEntity((0, _objects.assign)(Object.create(null), resp.data, {
                    Password: _this.encrypt(Password)
                }));
                _this.registry(user);
                return user;
            });
        }
    }, {
        key: 'checkCredentials',
        value: function checkCredentials() {
            var UserName = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var Password = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            if (!UserName || !Password) {
                throw new Error('No user');
            }
            var _pwd = this.encrypt(Password);
            var user = this.repository.filter(function (user) {
                return user.UserName === UserName && user.Password === _pwd;
            });
            if (user.length) {
                return user[0];
            } else {
                throw new Error('No user');
            }
        }
    }]);

    return UserRepository;
}();

UserRepository.IID = 'UserRepository';
UserRepository.$inject = ['$q', '$http', '$window', _Storage2.default.IID];

},{"../core/settings":5,"../storage/Storage":16,"../utils/objects":21}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Session = exports.SessionRepository = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dates = require('../utils/dates');

var _objects = require('../utils/objects');

var _Repositories = require('../models/Repositories');

var _Storage = require('../storage/Storage');

var _Storage2 = _interopRequireDefault(_Storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SessionRepository = exports.SessionRepository = function SessionRepository() {
    _classCallCheck(this, SessionRepository);

    this.atividades = new _Repositories.Repository();
    this.atividadesTarefa = new _Repositories.Repository();
    this.cenarios = new _Repositories.Repository();
    this.cenariosValor = new _Repositories.Repository();
    this.empresas = new _Repositories.Repository('RazaoSocial');
    this.funcoes = new _Repositories.Repository();
    this.obras = new _Repositories.Repository();
    this.tarefas = new _Repositories.Repository();
};

var Session = exports.Session = function () {
    function Session(Storage) {
        _classCallCheck(this, Session);

        this.Storage = Storage;
        this.type = 'sessions';
        this.user = null;
        this.repositorios = new SessionRepository();
        this.configuracao = (0, _objects.assign)(Object.create(null), {
            empresa: 0,
            obra: 0,
            contratada: 0,
            tarefa: 0,
            equipe: []
        });
        this.states = {
            started: false,
            time: ''
        };
        this.init();
    }

    _createClass(Session, [{
        key: 'init',
        value: function init() {
            this.lastSessions = this.Storage.read(this.type) || [];
        }
    }, {
        key: 'start',
        value: function start(user) {
            this.user = user;
            // states
            this.states.started = true;
            this.states.time = (0, _dates.toISOString)(new Date());
        }
    }, {
        key: 'end',
        value: function end() {
            this.user = null;
            // states
            this.states.started = false;
            this.states.time = '';
            // update localStorage sessions register
            var session = Session.simplify(this);
            this.lastSessions.push(session);
            this.Storage.write(this.type, this.lastSessions);
        }
    }, {
        key: 'isSet',
        value: function isSet() {
            return this.states.started;
        }
    }, {
        key: 'getToken',
        value: function getToken() {
            return this.user.Token;
        }
    }], [{
        key: 'simplify',
        value: function simplify(session) {
            var simpleSession = Object.create(null);
            simpleSession.configuracao = session.configuracao;
            return simpleSession;
        }
    }]);

    return Session;
}();

Session.IID = 'Session';
Session.$inject = [_Storage2.default.IID];

},{"../models/Repositories":11,"../storage/Storage":16,"../utils/dates":19,"../utils/objects":21}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = SessionInterceptor;

var _Session = require("./Session");

function SessionInterceptor(Session) {
    return {
        request: function request(config) {
            if (config.params && config.params.identify) {
                var params = config.params;
                var token = Session.getToken();
                if (!token) {
                    config.timeout = 1;
                } else {
                    params.token = token;
                }
                delete params.identify;
            }
            return config;
        }
    };
}
SessionInterceptor.$inject = [_Session.Session.IID];

},{"./Session":13}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n<ion-side-menus>\n    \n    <ion-side-menu-content>\n        <ion-nav-bar class=\"bar-balanced\">\n            <ion-nav-buttons side=\"left\">\n                <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"\"></button>\n            </ion-nav-buttons>\n        </ion-nav-bar>\n        <ion-nav-view></ion-nav-view>\n    </ion-side-menu-content>\n    \n    <ion-side-menu side=\"left\">\n        <ion-header-bar class=\"bar-stable\">\n            <div class=\"title\">Menu</div>\n        </ion-header-bar>\n        <ion-content padding=\"false\" class=\"side-menu-left has-header\" ion-content=\"\">\n            <ion-list>\n                <ion-item ui-sref=\"configuration\" menu-close=\"\">Configuração</ion-item>\n                <ion-item>Item 2</ion-item>\n                <ion-item>Item 3</ion-item>\n            </ion-list>\n            <div class=\"spacer\" style=\"width: 268px; height: 291px;\"></div>\n            <ion-list>\n                <ion-item ng-click=\"logout()\" menu-close=\"\">Logout</ion-item>\n            </ion-list>\n        </ion-content>\n    </ion-side-menu>\n    \n</ion-side-menus>\n";

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /// <reference path="../../typings/lz-string/lz-string.d.ts" />


var _settings = require('../core/settings');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
    function Storage($window) {
        _classCallCheck(this, Storage);

        this.LZString = $window.LZString;
        this.local = $window.localStorage;
        this.prefix = 'f.' + _settings.app.version;
        this.init();
    }

    _createClass(Storage, [{
        key: 'init',
        value: function init() {
            var _this = this;

            // version 0.2.0
            Object.keys(this.local).filter(function (key) {
                return key.includes('0.2.0');
            }).forEach(function (key) {
                _this.remove(key);
            });
        }
    }, {
        key: 'compact',
        value: function compact(value) {
            return this.LZString.compressToUTF16(JSON.stringify(value));
        }
    }, {
        key: 'descompact',
        value: function descompact(value) {
            return JSON.parse(this.LZString.decompressFromUTF16(value));
        }
    }, {
        key: 'write',
        value: function write(path, values) {
            this.local.setItem(this.prefix + '.' + path, this.compact(values));
        }
    }, {
        key: 'read',
        value: function read(path) {
            var data = this.local.getItem(this.prefix + '.' + path);
            return data ? this.descompact(data) : null;
        }
    }, {
        key: 'remove',
        value: function remove(path) {
            this.local.removeItem(path);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.local.clear();
        }
    }]);

    return Storage;
}();

exports.default = Storage;

Storage.IID = 'StorageService';
Storage.$inject = ['$window'];

},{"../core/settings":5}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToasterService = function () {
    function ToasterService($cordovaToast) {
        _classCallCheck(this, ToasterService);

        this.$cordovaToast = $cordovaToast;
    }

    _createClass(ToasterService, [{
        key: 'show',
        value: function show(message) {
            var duration = arguments.length <= 1 || arguments[1] === undefined ? 'short' : arguments[1];
            var position = arguments.length <= 2 || arguments[2] === undefined ? 'bottom' : arguments[2];

            if (this.$cordovaToast) {
                return this.$cordovaToast(message, duration, position);
            }
        }
    }]);

    return ToasterService;
}();

exports.default = ToasterService;

ToasterService.IID = 'ToastMessages';
ToasterService.$inject = ['$cordovaToast'];

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function sortByProp(prop) {
    return function sortByPropBinded(a, b) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
    };
}
var sortById = sortByProp('Id');
var sortByNome = sortByProp('Nome');
var sortByRazaoSocial = sortByProp('RazaoSocial');
function toIdMap(array) {
    return array.reduce(function (map, value) {
        map[value.Id] = value;
        return map;
    }, Object.create(null));
}
exports.sortByProp = sortByProp;
exports.sortById = sortById;
exports.sortByNome = sortByNome;
exports.sortByRazaoSocial = sortByRazaoSocial;
exports.toIdMap = toIdMap;

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toISOString = exports.getClockTime = undefined;

var _numbers = require('./numbers');

var getClockTime = function getClockTime(date) {
    return (0, _numbers.pad)(date.getUTCHours()) + ':' + (0, _numbers.pad)(date.getUTCMinutes()) + ':' + (0, _numbers.pad)(date.getUTCSeconds());
};
var toISOString = Date.prototype.toISOString ? function (date) {
    return Date.prototype.toISOString.call(date);
} : function (date) {
    return date.getUTCFullYear() + '-' + (0, _numbers.pad)(date.getUTCMonth() + 1) + '-' + (0, _numbers.pad)(date.getUTCDate()) + 'T' + (0, _numbers.pad)(date.getUTCHours()) + ':' + (0, _numbers.pad)(date.getUTCMinutes()) + ':' + (0, _numbers.pad)(date.getUTCSeconds()) + '.' + (date.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
};
exports.getClockTime = getClockTime;
exports.toISOString = toISOString;

},{"./numbers":20}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function pad(number) {
    return number < 10 ? "0" + number : number.toString(10);
}
;
exports.pad = pad;

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var assign = Object.assign || function (target) {
    'use strict';

    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
    }
    var to = Object(target);
    for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
            continue;
        }
        nextSource = Object(nextSource);
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
                to[nextKey] = nextSource[nextKey];
            }
        }
    }
    return to;
};
function toArray(map) {
    return Object.keys(map).sort().map(function (key) {
        return map[key];
    });
}
exports.assign = assign;
exports.toArray = toArray;

},{}]},{},[1])


//# sourceMappingURL=all.js.map

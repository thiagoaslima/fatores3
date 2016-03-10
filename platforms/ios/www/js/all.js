(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Session = require('./session/Session');

var _Session2 = _interopRequireDefault(_Session);

var _Routes = require('./core/Routes');

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/// <reference path="../typings/angularjs/angular.d.ts" />

angular.module('app.fatores', ['ionic', 'ngCordova']).service(_Session2.default.IID, _Session2.default).config(_Routes2.default.instance);

},{"./core/Routes":2,"./session/Session":4}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _login = require('../login/login.template');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import sidebar from '../sidebar/sidebar.template';
// import configuration from '../configuration/configuration.template';
// import equipe from '../equipe/equipe.template';
// import recursos from '../recursos/recursos.template';
// import atividades from '../atividades/atividades.template';
// import cenarios from '../cenarios/cenarios.template';

var Router = function () {
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
                restrict: false
            });
            this.$urlRouterProvider.otherwise('/login');
        }
    }], [{
        key: 'instance',
        value: function instance($stateProvider, $urlRouterProvider) {
            return new Router($stateProvider, $urlRouterProvider);
        }
    }]);

    return Router;
}();

exports.default = Router;

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function router($stateProvider, $urlRouterProvider) {
    var orig = $stateProvider.state;
    $stateProvider.state = function (name, obj) {
        if (obj.restrict === undefined) {
            obj.restrict = true;
        }
        return orig(name, obj);
    };
    var fetch = function fetch(model) {
        var attempt = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        return model.fetch().finally(function (resp) {
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
    $stateProvider.state('login', {
        url: '/login',
        template: _login2.default,
        // controller: 'LoginController',
        // controllerAs: 'LoginCtrl',
        restrict: false
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
}

},{"../login/login.template":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n<ion-view title=\"Login\">\n    <ion-content overflow-scroll=\"true\" padding=\"'true'\" class=\"has-header\">\n        <div class=\"bar-balanced\">\n            <i class=\"icon ion-image\"></i>\n        </div>\n\n        <form novalidate class=\"list\">\n            <ion-list>\n                <label class=\"item item-input\">\n                    <span class=\"input-label\">usuário</span>\n                    <input ng-model=\"LoginCtrl.UserName\" type=\"text\" placeholder=\"\">\n                </label>\n                <label class=\"item item-input\">\n                    <span class=\"input-label\">Senha</span>\n                    <input ng-model=\"LoginCtrl.Password\" type=\"password\" placeholder=\"\">\n                </label>\n            </ion-list>\n            <div class=\"spacer\" style=\"height: 40px;\"></div>\n            <button type=\"submit\" class=\"button button-balanced button-block\"\n            ng-click=\"LoginCtrl.login($event, LoginCtrl.UserName, LoginCtrl.Password)\">Entrar</button>\n        </form>\n\t\t\n    </ion-content>\n</ion-view>\n";

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dates = require('../utils/dates');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Session = function () {
    function Session() {
        _classCallCheck(this, Session);

        this.info = {
            started: false,
            horarioInicio: '',
            data: ''
        };
    }

    _createClass(Session, [{
        key: 'start',
        value: function start() {
            var date = new Date();
            this.info.started = true;
            this.info.horarioInicio = (0, _dates.getClockTime)(date);
            this.info.data = (0, _dates.toISOString)(date);
        }
    }, {
        key: 'end',
        value: function end() {
            this.info.started = false;
            this.info.horarioInicio = '';
            this.info.data = '';
        }
    }, {
        key: 'isSet',
        value: function isSet() {
            return this.info.started;
        }
    }]);

    return Session;
}();

exports.default = Session;

Session.IID = 'SessionService';

},{"../utils/dates":5}],5:[function(require,module,exports){
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
    Date.prototype.toISOString.call(date);
} : function (date) {
    return date.getUTCFullYear() + '-' + (0, _numbers.pad)(date.getUTCMonth() + 1) + '-' + (0, _numbers.pad)(date.getUTCDate()) + 'T' + (0, _numbers.pad)(date.getUTCHours()) + ':' + (0, _numbers.pad)(date.getUTCMinutes()) + ':' + (0, _numbers.pad)(date.getUTCSeconds()) + '.' + (date.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
};
exports.getClockTime = getClockTime;
exports.toISOString = toISOString;

},{"./numbers":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var pad = function pad(number) {
    return number < 10 ? "0" + number : number.toString(10);
};
exports.pad = pad;

},{}]},{},[1])


//# sourceMappingURL=all.js.map

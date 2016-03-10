import { Session } from '../session/Session';
let uiid = 0;
export function BasicListDirective() {
    return {
        scope: {},
        bindToController: {
            items: '=',
            ids: '=',
            model: '=',
            title: '@',
            prop: '@'
        },
        compile: function (element, attrs) {
            const num = uiid++;
            const name = attrs.title;
            let radio = element.find('ion-radio');
            radio.attr('name', `${name}_${num}`);
            return {
                pre: function () { },
                post: function () { }
            };
        },
        link: function (scope, element, attrs) {
            let name = attrs.title;
            angular.element(element).attr('name', name);
        },
        controller: BasicListController,
        controllerAs: 'BasicList',
        template: `
        <ion-list class="padding-top">
            
            <ion-item>
                <h4 ng-click="BasicList.toggle()" class="item item-divider">
                    {{::BasicList.title}}
                </h4>
                <div style="font-style:italic" ng-hide="BasicList.isVisible()">
                    <ion-item ng-click="BasicList.toggle()" ng-if="BasicList.model">{{BasicList.model[BasicList.prop]}}</ion-item>
                    <ion-item ng-click="BasicList.toggle()" ng-if="!BasicList.model">Clique para selecionar um item</ion-item>
                </div>
                <ion-list ng-show="BasicList.isVisible()">
                    <ion-radio ng-repeat="item in BasicList.items"
                        ng-value="item"
                        ng-selected="BasicList.isSelected(item)"
                        ng-click="BasicList.select(item)">
                            {{::item[BasicList.prop]}}
                    </ion-radio>
                </ion-list>
            </ion-item>
       </ion-list>
        `
    };
}
export class BasicListController {
    constructor($scope, Session) {
        this.$scope = $scope;
        this.Session = Session;
        this.visible = false;
        this.$scope.$watch(() => {
            return this.ids.length ? parseInt(this.ids.join(''), 10) : 0;
        }, (newValue, oldValue) => {
            if (!!newValue && newValue !== oldValue) {
                this.items = this.Session.repositorios[this.type];
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
    toggle() {
        this.visible = !this.visible;
    }
    isVisible() {
        return this.visible;
    }
    select(item) {
        this.model = item;
        this.toggle();
    }
    isSelected(item) {
        return item === this.model;
    }
}
BasicListController.IID = 'BasicListController';
BasicListController.$inject = ['$scope', Session.IID];

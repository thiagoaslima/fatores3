/* globals angular:true */
import { Session } from '../session/Session';
let uiid = 0;
export function TreeListDirective() {
    return {
        scope: {},
        bindToController: {
            get: '&repo',
            fullList: '=items',
            idsList: '=itemsIds',
            model: '=',
            title: '@'
        },
        compile: function (element, attrs) {
            const num = uiid;
            const name = attrs.title;
            const names = {
                lvl0: `${name}_parent_${num}`,
                lvl1: `${name}_lvl1_${num}`,
                lvl2: `${name}_lvl2_${num}`,
                lvl3: `${name}_lvl3_${num}`
            };
            let radios = element.find('ion-radio');
            Array.prototype.forEach.call(radios, (el, idx) => {
                return angular.element(el).attr('name', names[`lvl${idx}`]);
            });
            return {
                pre: function () { },
                post: function () { }
            };
        },
        controller: ['$scope', '$element', TreeListController],
        controllerAs: 'TreeList',
        template: `
         <ion-list class="padding-top">
            
            <ion-item>
                <h4 class="item item-divider">
                    {{::TreeList.title}}
                </h4>
                <div>
                    <ion-item ng-if="!TreeList.model">Clique para selecionar um item</ion-item>
                </div>
                
                
                <-- LVL 0 -->
                <ion-list ng-if="TreeList.items.length">
                    <ion-item ng-hide="TreeList.isVisible(0)"
                        ng-click="TreeList.toggle(0)">
                        {{TreeList.selecteds[0][TreeList.prop]}}
                    </ion-item>
                    <ion-radio ng-repeat="item in TreeList.items"
                        ng-value="item"
                        ng-show="TreeList.isVisible(0)"
                        ng-selected="TreeList.isSelected(item)"
                        ng-click="TreeList.select(item, 0)">
                            {{::item[TreeList.prop]}}
                    </ion-radio>
                </ion-list>
                
                
                
                <-- LVL 1 -->
                <ion-list ng-if="TreeList.selecteds[1] === item">
                    <ion-item ng-if="TreeList.selecteds[1]"
                        ng-hide="TreeList.isVisible(1)"
                        ng-click="TreeList.toggle(1)">
                        {{TreeList.selecteds[1][TreeList.prop]}}
                    </ion-item>
                    <ion-radio ng-repeat="item in TreeList.children[0]"
                        ng-value="item"
                        ng-show="TreeList.isVisible(1)"
                        ng-selected="TreeList.isSelected(item)"
                        ng-click="TreeList.select(item, 1)">
                            {{::item[TreeList.prop]}}
                    </ion-radio>
                </ion-list>
                
                
                
                <-- LVL 2 -->
                <ion-list ng-if="TreeList.selecteds[2] === item">
                    <ion-item ng-if="TreeList.selecteds[2]"
                        ng-hide="TreeList.isVisible(2)"
                        ng-click="TreeList.toggle(2)">
                        {{TreeList.selecteds[2][TreeList.prop]}}
                    </ion-item>
                    <ion-radio ng-repeat="item in TreeList.children[1]"
                        ng-value="item"
                        ng-show="TreeList.isVisible(2)"
                        ng-selected="TreeList.isSelected(item)"
                        ng-click="TreeList.select(item, 2)">
                            {{::item[TreeList.prop]}}
                    </ion-radio>
                </ion-list>
                
                
                <-- LVL 3 -->
                <ion-list ng-if="TreeList.selecteds[3] === item">
                    <ion-item ng-if="TreeList.selecteds[3]"
                        ng-hide="TreeList.isVisible(3)"
                        ng-click="TreeList.toggle(3)">
                        {{TreeList.selecteds[3][TreeList.prop]}}
                    </ion-item>
                    <ion-radio ng-repeat="item in TreeList.children[2]"
                        ng-value="item"
                        ng-show="TreeList.isVisible(3)"
                        ng-selected="TreeList.isSelected(item)"
                        ng-click="TreeList.select(item, 3)">
                            {{::item[TreeList.prop]}}
                    </ion-radio>
                </ion-list>
                
                
            </ion-item>
       </ion-list>
        `
    };
}
export class TreeListController {
    constructor($scope, Session) {
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
    watchers() {
        this.$scope.$watch(() => {
            debugger;
            return this.ids.length ? parseInt(this.ids.join(''), 10) : 0;
        }, (newValue, oldValue) => {
            if (!!newValue && newValue !== oldValue) {
                this.items = this.Session.repositorios[this.type].get(this.ids);
            }
        });
    }
    toggle(level) {
        let allHidden = [false, false, false, false];
        allHidden[level] = !this.visible[level];
        this.visible = allHidden;
    }
    isVisible(level) {
        return this.visible[level];
    }
    select(item, level) {
        if (this.selecteds.length > level) {
            this.selecteds.length = level;
            this.children.length = level;
        }
        this.model = (!item.children.length) ? item : null;
        this.selecteds.push(item);
        this.children.push(this.get(item.children));
    }
    isSelected(item) {
        return item === this.model;
    }
}
TreeListController.IID = 'TreeListController';
TreeListController.$inject = ['$scope', Session.IID];

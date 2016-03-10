/// <reference path="../../typings/fatores/models.d.ts" />
import { assign, toArray } from "../utils/objects";
import { sortByProp, sortById, sortByNome, sortByRazaoSocial } from "../utils/arrays";
export class Repository {
    constructor(sortProperty = 'Nome') {
        this._map = Object.create(null);
        const sorts = {
            "Id": sortById,
            "Nome": sortByNome,
            "RazaoSocial": sortByRazaoSocial,
            "default": sortByProp
        };
        this.sort = sorts[sortProperty] ?
            sorts[sortProperty] :
            sorts.default(sortProperty);
    }
    register(items) {
        items.forEach(item => {
            const id = item.Id;
            if (this._map[id]) {
                this._map[id] = assign(this._map[id], item);
            }
            else {
                this._map[id] = item;
            }
        });
    }
    get(ids, sort = true) {
        const items = ids.map(id => this._map[id]).filter(item => !!item);
        return sort ? items.sort(this.sort.bind(this)) : items;
    }
    getAll(sort = true) {
        const items = toArray(this._map);
        return sort ? items.sort(this.sort.bind(this)) : items;
    }
}
export class TreeRepository extends Repository {
    constructor(parentProperty, sortProperty = 'Nome') {
        super(sortProperty);
        this._map = Object.create(null);
        this.basicTreeObj = {
            children: []
        };
        this.parentProperty = parentProperty;
    }
    register(items) {
        items.forEach(item => {
            const id = item.Id;
            if (this._map[id]) {
                const oldParentId = this._map[id][this.parentProperty];
                const newParentId = item[this.parentProperty];
                this._map[id] = assign(this._map[id], item);
                if (oldParentId !== newParentId) {
                    this.unregisterChild(oldParentId, item.Id);
                    this.registerChild(newParentId, item.Id);
                }
                return;
            }
            const parentId = item[this.parentProperty];
            this._map[id] = assign(item, this.basicTreeObj);
            this.registerChild(parentId, id);
        });
    }
    registerChild(parentId, id) {
        if (!this._map[parentId]) {
            this._map[parentId] = assign({ Id: parentId }, this.basicTreeObj);
        }
        const parent = this._map[parentId];
        this._map[parentId] = parent;
        if (parent.children.indexOf(id) === -1) {
            parent.children.push(id);
        }
        parent.children.sort();
    }
    unregisterChild(parentId, id) {
        const parent = this._map[parentId];
        const idx = parent.children.indexOf(id);
        parent.children.splice(idx, 1);
    }
    getFromRoot(ids) {
        const items = this.get(ids, false);
        const picked = Object.create(null);
        const parentIds = Object.create(null);
        items.forEach(item => {
            picked[item.Id] = item;
            parentIds[item[this.parentProperty]] = true;
        });
        const parents = this.get(Object.keys(parentIds).filter(id => !picked[id]).map(parseInt), false);
        return items.concat(parents);
    }
}

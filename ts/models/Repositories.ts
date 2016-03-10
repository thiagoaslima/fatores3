/// <reference path="../../typings/fatores/models.d.ts" />

import { assign, toArray } from "../utils/objects";
import { toIdMap, sortByProp, sortById, sortByNome, sortByRazaoSocial } from "../utils/arrays";


export interface IMap<T> {
    [Id: number]: T
}

export interface IRepository<T extends fatores.models.IModel> {
    register: (items: T[]) => void;
    get: (ids: number[], sort?: boolean) => Array<T>;
    getAll: (sort?: boolean) => Array<T> ;
}

export interface ITreeRepository<T extends fatores.models.ITree> extends IRepository<T> {
    register: (items: T[]) => void;
    registerChild: (parentId: number, childId: number) => void;
    unregisterChild: (parent: number, childId: number) => void;
    get: (ids: number[], sort?: boolean) => Array<T>;
    getFromRoot: (ids: number[]) => T[];
}

export class Repository<T extends fatores.models.IModel> implements IRepository<T> {
    protected _map: IMap<T> = Object.create(null);
    protected sort: (a: T, b: T) => number;

    constructor(sortProperty = 'Nome') {
        const sorts = {
            "Id": sortById,
            "Nome": sortByNome,
            "RazaoSocial": sortByRazaoSocial,
            "default": sortByProp
        }

        this.sort = sorts[sortProperty] ?
            sorts[sortProperty] :
            sorts.default(sortProperty);
    }

    public register(items: T[]): void {
        items.forEach(item => {
            const id = item.Id;

            if (this._map[id]) {
                this._map[id] = assign(this._map[id], item);
            } else {
                this._map[id] = item;
            }
        });
    }

    public get(ids: number[], sort = true): T[] {
        const items = ids.map(id => this._map[id]).filter(item => !!item);
        return sort ? items.sort(this.sort.bind(this)) : items;
    }
    
    public getAll(sort = true): T[] {
        const items: T[] = toArray(this._map);
        return sort ? items.sort(this.sort.bind(this)) : items;
    }
}



export class TreeRepository<T extends fatores.models.ITree> extends Repository<T> implements ITreeRepository<T> {
    protected parentProperty: string;
    protected _map: IMap<T> = Object.create(null);
    private basicTreeObj = <T>{
        children: []
    };
 
    constructor(parentProperty: string, sortProperty = 'Nome') {
        super(sortProperty);
        this.parentProperty = parentProperty;
    }

    public register(items: T[]): void {
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
    
    public registerChild(parentId: number, id: number): void {
        if (!this._map[parentId]) {
            this._map[parentId] = assign({Id: parentId}, this.basicTreeObj);    
        }
        
        const parent = this._map[parentId];
        this._map[parentId] = parent;
        
        if (parent.children.indexOf(id) === -1) {
            parent.children.push(id);
        }

        parent.children.sort();
    }
    
    public unregisterChild(parentId: number, id: number): void {
        const parent = this._map[parentId];
        const idx = parent.children.indexOf(id);
        parent.children.splice(idx, 1);
    }

    public getFromRoot(ids: number[]): T[] {
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
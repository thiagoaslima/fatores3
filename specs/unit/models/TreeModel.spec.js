import { TreeModel, TreeEntity } from '../../../es6/models/TreeModel';
import Promise from 'bluebird';

const $httpMock = {
	get() {
		return new Promise( resolve => resolve({status: 200, data: serverItems}) );
	},
	post() {
		return;
	}
}

const $qMock = function(fn) {
	return new Promise(fn); 
};

const StorageMock = {
    save: function(str) {
        return str;
    },
    get: function(str) {
        return [];
    }
};

const flatData = [{
    Id: 1,
    Nome: 'Root 1',
    parentId: null,
}, {
    Id: 2,
    Nome: 'Root 2',
    parentId: null,
}, {
    Id: 3,
    Nome: 'Root 3',
    parentId: null,
}, {
    Id: 4,
    Nome: '4 -Child 1',
    parentId: 1,
}, {
    Id: 5,
    Nome: '5 -Child 1',
    parentId: 1,
}, {
    Id: 6,
    Nome: '6 -Child 2',
    parentId: 2,
}, {
    Id: 7,
    Nome: '7 -Child 3',
    parentId: 3,
}, {
    Id: 8,
    Nome: '8 -Child 7',
    parentId: 7,
}]

const roots = [{
    Id: 1,
    Nome: 'Root 1',
    parentId: null,
    _children: [4 ,5]
}, {
    Id: 2,
    Nome: 'Root 2',
    parentId: null,
    _children: [6]
}, {
    Id: 3,
    Nome: 'Root 3',
    parentId: null,
    _children: [7]
}]

const treeData = [{
    Id: 1,
    Nome: 'Root 1',
    parentId: null,
    _children: [{
        Id: 4,
        Nome: '4 -Child 1',
        parentId: 1,
    }, {
        Id: 5,
        Nome: '5 -Child 1',
        parentId: 1,
    }]
}, {
    Id: 2,
    Nome: 'Root 2',
    parentId: null,
    _children: [{
        Id: 6,
        Nome: '6 -Child 2',
        parentId: 2,
    }]
}, {
    Id: 3,
    Nome: 'Root 3',
    parentId: null,
    _children: [{
        Id: 7,
        Nome: '7 -Child 3',
        parentId: 3,
        _children: [{
            Id: 8,
            Nome: '8 -Child 3',
            parentId: 7,
        }]
    }]
}]

describe('TreeModel', () => {
   
   let model;
   
   beforeEach( () => {
       model = new TreeModel('tree', '', 'parentId', TreeEntity, $httpMock, $qMock, StorageMock);
   });
   
   it('should build the tree and have 3 root items in the list', () => {
       model.queue(flatData);
       let expected = JSON.stringify(roots);
       let actual = JSON.stringify(model.roots);
       
       expect(actual).toBe(expected);
   });
    
});
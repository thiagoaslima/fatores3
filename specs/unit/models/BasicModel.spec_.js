import { BasicModel, BasicEntity } from '../../../es6/models/BasicModel';
import Promise from 'bluebird';

const lista = [{
	Id: 1
}, {
	Id: 2
}, {
	Id: 3
}];

const serverItems = [{
	Id: 4
}, {
	Id: 5
}, {
	Id: 6
}, {
	Id: 7
}, {
	Id: 8
}];

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

describe('BasicModel', () => {
	let model;
	
	beforeEach(() => {
		model = new BasicModel('basic', '', BasicEntity, $httpMock, $qMock, StorageMock);
	});
	
	it ('should start with no elements on list', () => {
		expect(model.list.length).toBe(0);
	});
	
	it ('should include three itens on the list', () => {
		model.queue(lista);
		expect(model.list.length).toBe(3);	
	});
	
	it ('should remove one of the elements from the list', () => {
		model.queue(lista).unqueue({Id: 2});
		expect(model.list.length).toBe(2);
	});
	
	it ('should select an item', () => {
		model.queue(lista);
		model.select({Id: 2});
		expect(model.selected.Id).toBe(2);
	});
	
	it ('should deselect an item', () => {
		model.queue(lista);
		model.select({Id: 3}).deselect({Id: 3});
		expect(model.selected).toBe(null);
	});
	
	it ('should fetch and list 5 items from the server', (done) => {
		spyOn($httpMock, 'get').and.callThrough();
		model.fetch().then(() => {
			expect(model.list.length).toBe(5);
			done();
		});
	});
	
	it ('should try get and, then, fetch and list 5 items from the server', (done) => {
		spyOn($httpMock, 'get').and.callThrough();
		model.get(serverItems).then(() => {
			expect(model.list.length).toBe(5);
			done();
		});
	});
})
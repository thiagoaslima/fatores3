import * as utils from '../../../es6/utils/transformLists';

const array = [{
	Id: 1,
	Name: 'item 1'
}, {
	Id: 2,
	Name: 'item 2'
}, {
	Id: 3,
	Name: 'item 3'
}];

const map = {
	1: {
		Id: 1,
		Name: 'item 1'
	},
	
	2: {
		Id: 2,
		Name: 'item 2'
	},
	
	3: {
		Id: 3,
		Name: 'item 3'
	}
};

const map2 = {
	3: {
		Id: 3,
		Name: 'item 3'
	},
	
	1: {
		Id: 1,
		Name: 'item 1'
	},
	
	2: {
		Id: 2,
		Name: 'item 2'
	}
};

describe('mapify', () => {
	
	it('should convert an array into a Map indexed by Id', () => {
		let expected = JSON.stringify(map);
		let actual = JSON.stringify(utils.mapify(array));
		
		expect(actual).toBe(expected);
	});
});

describe('arrify', () => {
	
	it('should convert a map into an array sorted by Id', () => {
		let expected = JSON.stringify(array);
		let actual = JSON.stringify(utils.arrify(map2));
		
		expect(actual).toBe(expected);
	});
});
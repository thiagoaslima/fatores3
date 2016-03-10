import Storage from '../../../es6/storage/Storage';

const dados = [{
	Id: 1,
	Nome: 'item 1'
}, {
	Id: 2,
	Nome: 'item 2'
}, {
	Id: 3,
	Nome: 'item 3'
}];

const type = {
	name: 'teste',
	props: Object.keys(dados[0])
};

let _items = {};
const windowMock = {
	localStorage: {
		setItem(name, value) {
			_items[name] = value;
		},
		
		getItem(name) {
			return _items[name];
		}
	},
	
	LZString: {
		compressToUTF16(str) {
			return str.split('').reverse().join('');
		},
		decompressFromUTF16(str) {
			return str.split('').reverse().join('');
		}
	}
};

describe('Storage', () => {
	let storage;
	
	beforeEach(() => {
		storage = new Storage(windowMock);
	});
	
	it('should compact the object, turning it into an UTF16 String', () => {
		let expected = windowMock.LZString.compressToUTF16(JSON.stringify(dados));
		let actual = storage.compact(dados);
		
		expect(actual).toBe(expected);
	});
	
	it('should descompact the array of arrays, reducing to an array of objects', () => {
		let expected = JSON.stringify(dados);
		let actual = storage.descompact(storage.compact(dados));

		expect(JSON.stringify(actual)).toBe(expected);
	});
	
	it('should save itens on local storage', () => {
		let expected = windowMock.LZString.compressToUTF16(JSON.stringify(dados));		
		let actual;		
		storage.save(type.name, dados);
		actual = windowMock.localStorage.getItem(`${storage.prefix}.${type.name}`);
		
		expect(actual).toBe(expected);
	});
	
	it('should recover itens on local storage and convert it to array of objects', () => {
		let expected = JSON.stringify(dados);

		let actual = storage.get(type.name);
		
		expect(JSON.stringify(actual)).toEqual(expected);
	});
})
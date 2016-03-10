function sortByProp(prop: string): ((a: Object, b: Object) => number) {
    return function sortByPropBinded(a: Object, b: Object): number {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
    }
}

const sortById = sortByProp('Id');
const sortByNome = sortByProp('Nome');
const sortByRazaoSocial = sortByProp('RazaoSocial');

function toIdMap(array: any[]): Object {
	return array.reduce( (map, value) => {
		map[value.Id] = value;
		return map;
	}, Object.create(null));
}

export {
    sortByProp,
    sortById,
    sortByNome,
    sortByRazaoSocial,
    toIdMap
};
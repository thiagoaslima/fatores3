function sortByProp(prop) {
    return function sortByPropBinded(a, b) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
    };
}
const sortById = sortByProp('Id');
const sortByNome = sortByProp('Nome');
const sortByRazaoSocial = sortByProp('RazaoSocial');
function toIdMap(array) {
    return array.reduce((map, value) => {
        map[value.Id] = value;
        return map;
    }, Object.create(null));
}
export { sortByProp, sortById, sortByNome, sortByRazaoSocial, toIdMap };

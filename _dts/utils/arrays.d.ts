declare function sortByProp(prop: string): ((a: Object, b: Object) => number);
declare const sortById: (a: Object, b: Object) => number;
declare const sortByNome: (a: Object, b: Object) => number;
declare const sortByRazaoSocial: (a: Object, b: Object) => number;
declare function toIdMap(array: any[]): Object;
export { sortByProp, sortById, sortByNome, sortByRazaoSocial, toIdMap };

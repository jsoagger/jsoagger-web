import { _doGet, buildURLQuery, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const typeService = {
    getByPath,
    getById,
    getSubtypeOf,
    getLifecycleOf,
    getSubtypeOfRecursive
};
/**
 * Get a type by its id
 * 
 * @param {*} id 
 */
async function getById(id){
	const uri = "api/type/" + id + "/?containerId=:containerId";
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
/**
 * Get a type by its path
 * 
 * @param {*} typePath 
 */
async function getByPath(typePath){
	var p = buildURLQuery({path: typePath});
	const uri = "api/type/byPath/?containerId=:containerId&".concat(p);
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
/**
 * Get subtype of a base type
 * 
 * @param {*} typePath The path of the parent type 
 */
async function getSubtypeOf(typeId, includeParentItems) {
	var p = buildURLQuery({fetchInParent:includeParentItems});
	const uri = "api/type/" + typeId + "/subtypes/?containerId=:containerId&".concat(p);
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
/**
 * Get subtype of a base type
 * 
 * @param {*} typePath The path of the parent type 
 */
async function getSubtypeOfRecursive(typeId, includeParentItems) {
	var p = buildURLQuery({fetchInParent:includeParentItems, recursive: 'true'});
	const uri = "api/type/" + typeId + "/subtypes/?containerId=:containerId&".concat(p);
	const url = `${API_ROOT}/` + uri;
	console.log('>>>>>>>>>> 1 : ' + url)
    return _doGet(url);
}
/**
 * Get type associated lifecycle
 * 
 * @param typeId
 * @returns
 */
async function getLifecycleOf(typeId) {
	const uri = "api/type/" + typeId + "/lifecycle/?containerId=:containerId"
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}

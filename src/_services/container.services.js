import { _doGet, buildURLQuery, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const containerService = {  
    getAllLifecycles,
    getAllFolderTemplates,
    getAllEmailTemplates,
    getAllTeamTemplates,
    getRootTypes,
    getAllMembers,
    getApplicationRootContainer,
    getChildrenContainers,
    getById,
    getParentContainer
}
function getParentContainer(id){
	const uri = 'api/container/' + id + '/parent';
	const url = `${API_ROOT}/` + uri;
    return _doGet(url)
}
function getById(id){
	const uri = 'api/container/' + id;
	const url = `${API_ROOT}/` + uri;
    return _doGet(url)
}
function getChildrenContainers(id){
	const uri = 'api/container/' + id + '/subContainers';
	const url = `${API_ROOT}/` + uri;
	console.log('get container children : ' +  id)
    return _doGet(url)
}
/**
 * Get the root container
 * @returns
 */
function getApplicationRootContainer(){
	const uri = "api/container/?path=%2F";
	const url = `${API_ROOT}/` + uri;
    return _doGet(url)
}
/**
 * Get all lifecycles.
 * 
 * @param page The page
 * @param pageSize The page size
 * @param includeParentItems Include parent items
 * @returns Promise
 */
async function getAllLifecycles(page, pageSize, includeParentItems) {
	var params = {page: page,pageSize:pageSize ,includeParentItems: includeParentItems};
	var p = buildURLQuery(params);
	const uri = "api/container/:containerId/lifecycles/?".concat(p);
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
/**
 * Get all folder templates.
 * 
 * @param page The page
 * @param pageSize The page size
 * @param includeParentItems Include parent items
 * @returns Promise
 */
async function getAllFolderTemplates(page, pageSize, includeParentItems) {
	var params = {page: page,pageSize:pageSize ,includeParentItems: includeParentItems};
	var p = buildURLQuery(params);
	const uri = "api/container/:containerId/folderTemplates/?".concat(p);
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
/**
 * Get all email templates.
 * 
 * @param page The page
 * @param pageSize The page size
 * @param includeParentItems Include parent items
 * @returns Promise
 */
async function getAllEmailTemplates(page, pageSize, includeParentItems) {
	var params = {page: page,pageSize:pageSize ,includeParentItems: includeParentItems};
	var p = buildURLQuery(params);
	const uri = "api/container/:containerId/enTemplates/?".concat(p);
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
/**
 * Get all team templates.
 * 
 * @param page The page
 * @param pageSize The page size
 * @param includeParentItems Include parent items
 * @returns Promise
 */
async function getAllTeamTemplates(page, pageSize, includeParentItems) {
	var params = {page: page,pageSize:pageSize ,includeParentItems: includeParentItems};
	var p = buildURLQuery(params);
	const uri = "api/container/:containerId/teamTemplates/?".concat(p);
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
/**
 * Get root types.
 * 
 * @param includeParentItems Include parent items
 * @returns Promise
 */
async function getRootTypes(page, pageSize, includeParentItems) {
	var params = {page: page,pageSize:pageSize ,includeParentItems: includeParentItems};
	var p = buildURLQuery(params);
	const uri = "api/container/:containerId/rootTypes/?".concat(p);
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
/**
 * Get all members.
 * 
 * @param page The page
 * @param pageSize The page size
 * @param includeParentItems Include parent items
 * @returns Promise
 */
async function getAllMembers(page, pageSize, includeParentItems) {
	var params = {page: page,pageSize:pageSize ,includeParentItems: includeParentItems};
	var p = buildURLQuery(params);
	const uri = "api/container/:containerId/members/?".concat(p);
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}

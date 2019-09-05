import { _doGet, _doPost, buildURLQuery, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const businessRulesService = {
    getAllBusinessEvent,
    getApplicableRules,
    getById,
    activate,
    desactivate
}
function activate(id){
	const uri = 'api/businessRule/' + id  + '/activate/?containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
    return _doPost(url);
}
function desactivate(id){
	const uri = 'api/businessRule/' + id  + '/desactivate/?containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
    return _doPost(url);
}
/**
 * Get all business events in application
 */
function getById(id){
	const uri = 'api/businessRule/' + id  + '/?containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
/**
 * @returns
 */
async function getAllBusinessEvent(){
	const uri = "api/businessRule/businessEvents/?containerId=:containerId";
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
/**
 * Get applicable rule.
 * 
 * @param formData
 * @returns
 */
function getApplicableRules(formData){
	console.log(JSON.stringify(formData))
	if(formData.eventKey === undefined) formData.eventKey = ''
		
	var p = buildURLQuery(formData);
	const uri = "api/businessRule/applicableRules/?".concat(p).concat('&containerId=:containerId');
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
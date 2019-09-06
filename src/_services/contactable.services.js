import { _doGet, buildURLQuery, _doPut, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const contactableService = {
	getWebContacts,
	getTelecomContacts,
	getPostalContacts,
	updateWebContacts,
	updateTelecomContacts,
	updatePostalContacts,
	getAllContacts
};
/**
 */
async function getAllContacts(contactableId){
	const uri = 'api/contactable/' + contactableId + '/contacts?containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
/**
 */
async function updatePostalContacts(contactableId, contactMecId, payload){
	const uri = 'api/contactable/' + contactableId + '/contacts/' +  contactMecId + '/postal?containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
    return _doPut(url, payload);
}
/**
 */
async function updateTelecomContacts(contactableId, contactMecId, payload){
	const uri = 'api/contactable/' + contactableId + '/contacts/' +  contactMecId + '/telecom?containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
    return _doPut(url, payload);
}
/**
 */
async function updateWebContacts(contactableId, contactMecId, payload){
	const uri = 'api/contactable/' + contactableId + '/contacts/' +  contactMecId + '/web?containerId=:containerId&add=false';
	const url = `${API_ROOT}/` + uri;
    return _doPut(url, payload);
}
/**
 */
async function getPostalContacts(contactableId, contactMecId){
	const uri = 'api/contactable/' + contactableId + '/contacts/' +  contactMecId + '/?containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
/**
 */
async function getTelecomContacts(contactableId, contactMecId){
	const uri = 'api/contactable/' + contactableId + '/contacts/' +  contactMecId + '/?containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
/**
 */
async function getWebContacts(contactableId, contactMecId){
	const uri = 'api/contactable/' + contactableId + '/contacts/' +  contactMecId + '/?containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}



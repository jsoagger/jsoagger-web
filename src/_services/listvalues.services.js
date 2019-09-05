import { _doGet, buildURLQuery, API_ROOT } from './utils/services.config';

/**
 * Export
 */
export const listValuesService = {   
	names,
	listvalues,
	noLocale,
	details
};
async function listvalues(formData) {
	var p = buildURLQuery(formData);
	const uri = 'api/listvalues/?containerId=:containerId&'.concat(p);
	const url = `${API_ROOT}/` + uri;
	return _doGet(url);
}
async function names() {
	const uri = 'api/listvalues/names/?containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
	return _doGet(url);
}
async function noLocale(formData) {
	var p = buildURLQuery(formData);
	const uri = 'api/listvalues/noLocale/?containerId=:containerId&'.concat(p);
	const url = `${API_ROOT}/` + uri;
	return _doGet(url);
}
async function details(id) {
	const uri = 'api/listvalues/details/' + id + '/?containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
	console.log('url : ' + url)
	return _doGet(url);
}


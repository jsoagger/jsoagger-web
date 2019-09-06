import { _doGet, buildURLQuery, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const installationService = {
    details,
    getHistories
};
/**
 * Installation history of application
 * 
 * @param {*} id 
 */
async function getHistories() {
    const uri = "api/versionHistory/";
    const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}

async function details(id) {
    const uri = "api/versionHistory/" + id;
    const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}

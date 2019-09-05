import { _doGet, buildURLQuery, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const folderTemplateService = {
    getById,
};
/**
 * Get a folder template by its identifier.
 * 
 * @param {*} id 
 */
async function getById(id) {
    const uri = "api/folderTemplate/".concat(id).concat("?containerId=:containerId");
    const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}

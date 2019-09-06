import { 
	_doGet, 
	_doGetText,
	_doPost,
	_doPostMp,
	_doGetBlob,
	buildURLQuery, 
	API_ROOT 
} 
from './utils/services.config';
/**
 * Default Export
 */
export const contentHolderService = {
	downloadPrimaryContent,
	downloadPrimaryContentBlob,
	downloadAttachment,
    contentInfos,
    setPrimaryContentFile,
    addAttachment,
}
function addAttachment(contentHolderId, formData){
	
}
function downloadAttachment(contentHolderId, attachementId){
	
}
/**
 * Download the primary content
 * 
 * @param contentHolderId
 * @returns
 */
function downloadPrimaryContent(contentHolderId) {
	let uri = '/api/contentHolder/' + contentHolderId + '/content/?role=primary&containerId=:containerId'
    var url = `${API_ROOT}` + uri
	return _doGetText(url)
}
/**
 * Download primary content.
 * 
 * @param contentHolderId
 * @returns
 */
function downloadPrimaryContentBlob(contentHolderId) {
	let uri = '/api/contentHolder/' + contentHolderId + '/content/?role=primary&containerId=:containerId'
    var url = `${API_ROOT}` + uri
	return _doGetBlob(url)
}
/**
 * Set primary content.
 * 
 * @param contentHolderId
 * @param formData
 * @returns
 */
function setPrimaryContentFile(contentHolderId, formData){
	let uri = '/api/contentHolder/' + contentHolderId + '/setContentFile/?role=primary&containerId=:containerId'
    var url = `${API_ROOT}` + uri
    console.log('url: ' + url)
	return _doPostMp(url, formData)
}
/**
 * Get content infos of given content holder.
 * 
 * @param contentHolderId
 * @param role primary, attachments, all
 * @returns
 */
function contentInfos(contentHolderId, role){
	let uri = '/api/contentHolder/' + contentHolderId + '/contentInfo/?role=' + role + '&containerId=:containerId'
    var url = `${API_ROOT}` + uri
	return _doGet(url)
}




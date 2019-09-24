import { _doPost,_doGet,_doPut, API_ROOT, _doDelete, buildURLQuery } from './utils/services.config';

export const accountService = {
    lock,
	unlock,
	resetPassword,
	updatePassword,
	lostPassword,
	accountDetails,
	accountOfParty,
	updatePersonProfile,
	activateAccount,
	registerPersonWithAccount,
	containersMembership,
	isUserInContainer,
	addContainerMembership,
	removeContainerMembership,
	ownerType
}
/**
 * Register a new user with account
 * 
 * @param formData
 * @returns 
 */
function registerPersonWithAccount(formData){
	const uri = '/api/people/';
    var url = `${API_ROOT}` + uri
	return _doPost(url, JSON.stringify(formData))
}
/**
 * Activate an account.
 * 
 * @param accountId
 * @param formData
 * @returns
 */
function activateAccount(login, formData, lockToken){
	const uri = '/inactive/auth/activateAccount?login=' + login;
    var url = `${API_ROOT}` + uri
	return _doPost(url, JSON.stringify(formData))
}
/**
 * Load an account with details of owner loaded in links.
 */
function accountDetails(accountId) {
	const uri = '/api/account/' + accountId + '/details/?containerId=:containerId';
    var url = `${API_ROOT}` + uri
	return _doGet(url);
}
/**
 * Loads account of a party  with its details loaded in links.
 */
function accountOfParty(partyId) {
	var params = {partyId: partyId};
	var p = buildURLQuery(params);
	const uri = '/api/account/ofParty/?containerId=:containerId&' + p;
    var url = `${API_ROOT}` + uri
	return _doGet(url);
}
/**
 * Lock an account.
 * 
 * @param {*} accountId 
 */
function lock(accountId) {
	const uri = '/api/account/' + accountId + '/lock/?containerId=:containerId';
    var url = `${API_ROOT}` + uri
	return _doPost(url);
}
/**
 * Unlock an account. Super admin can unlock user account without
 * lock token
 * 
 * @param {*} accountId 
 * @param {*} lockToken Mandatory if not superadmin
 */
function unlock(accountId, lockToken) {
	var params = {lockToken: lockToken ? lockToken : ''};
	var p = buildURLQuery(params);
    const uri = '/api/account/' + accountId + '/unlock?containerId=:containerId&'.concat(p);
	var url = `${API_ROOT}` + uri
	return _doPost(url);
}
/**
 * Rest current password.
 * 
 * @param {*} accountId 
 */
function resetPassword(accountId) {
    const uri = '/api/account/' + accountId + '/resetPassword?containerId=:containerId';
	var url = `${API_ROOT}` + uri
	return _doPut(url);
}
/**
 * Update user password.
 * 
 * @param {*} accountId 
 * @param {*} formData 
 */
function updatePassword(accountId, formData) {
    const uri = '/api/account/' + accountId + '/updatePassword?containerId=:containerId';
    var url = `${API_ROOT}` + uri
    return _doPut(url, formData);
}
/**
 * Send an email to user with its token.
 * 
 * @param {*} accountId 
 */
function lostPassword(login) {
    const uri = '/anon/auth/lostPassword?login=' + login;
    var url = `${API_ROOT}` + uri
    return _doGet(url);
}
/**
 * Update profile.
 * 
 * @param profileId
 * @param formData
 * @returns
 */
function updatePersonProfile(profileId, formData){
	const uri = '/api/people/' + profileId + '?containerId=:containerId';
    var url = `${API_ROOT}` + uri
    return _doPut(url, formData);
}
/**
 * Get all container memberships of given user account.
 * 
 * @param accountId
 * @returns
 */
function containersMembership(accountId){
	const uri = '/api/account/' + accountId + '/containersMembership/?containerId=:containerId';
    var url = `${API_ROOT}` + uri
	return _doGet(url);
}
/**
 * Return true is the account is declared member in that container.
 * 
 * @returns
 */
function isUserInContainer(accountId, containerId){
	const uri = '/api/account/' + accountId + '/containersMembership/' + containerId + '/isMember';
    var url = `${API_ROOT}` + uri
	return _doGet(url);
}
/**
 * Add account as member of container.
 * 
 * @param accountId
 * @param containerId
 * @returns
 */
function addContainerMembership(accountId, containerId){
	const uri = '/api/account/' + accountId + '/containersMembership/' + containerId;
    var url = `${API_ROOT}` + uri
	return _doPost(url);
}
/**
 * Remove an account from container members
 * 
 * @param accountId
 * @param containerId
 * @returns
 */
function removeContainerMembership(accountId, containerId){
	const uri = '/api/account/' + accountId + '/containersMembership/' + containerId;
    var url = `${API_ROOT}` + uri
	return _doDelete(url);
}
/**
 * Returns the type of the owner.
 * 
 * @param accoundId
 * @returns
 */
async function ownerType(accoundId){
	const uri = "api/account/" + accoundId + "/ownerType/?containerId=:containerId"
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}

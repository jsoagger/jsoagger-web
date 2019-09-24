import { 
	_doGet, 
	buildURLQuery, 
	API_ROOT 
} 
from './utils/services.config';

/**
 * Rev controlled
 */
export const searchService = {
	searchUserByNameLikeInWholeApplication,
	searchUserByLoginLikeInWholeApplication,
	searchContainerMemberByNameLike,
	searchContainerMemberByLoginLike
}
/**
 * Get account by name like, will do search in whole application.
 * Should be called only when working container is /Unaffiliated.
 * 
 * @param login
 * @returns
 */
async function searchUserByNameLikeInWholeApplication(name) {
	const uri = '/api/account/byNameLike/?name=' + name + '&containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
	return _doGet(url);
}
/**
 * Get account by name like, will do search in whole application.
 * Should be called only when working container is /Unaffiliated.
 * 
 * @param login
 * @returns
 */
async function searchUserByLoginLikeInWholeApplication(login) {
	const uri = '/api/account/byLoginLike/?login=' + login + '&containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
	return _doGet(url);
}


/**
 * Search given user in given container.
 * This function just query login not firstname/lastname because email
 * should be composed by person lastname/firstname.
 * 
 * @returns
 */
async function searchContainerMemberByNameLike(name, containerId) {
	const uri = '/api/account/memberByLoginLikeInContainer/?name=' + name + '&containerId=' + containerId;
	const url = `${API_ROOT}/` + uri;
	return _doGet(url);
}
/**
 * Search given user in given container.
 * 
 * @returns
 */
async function searchContainerMemberByLoginLike(login, containerId) {
	const uri = '/api/account/memberByLoginLikeInContainer/?login=' + login + '&containerId=' + containerId;
	const url = `${API_ROOT}/` + uri;
	return _doGet(url);
}


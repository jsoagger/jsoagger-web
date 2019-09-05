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
    searchUserByLoginLike,
    searchUserByNameLike,
}
/**
 * Get account by name like
 * 
 * @param revControlledId
 * @returns
 */
async function searchUserByNameLike(name) {
	const uri = '/api/account/byNameLike/?name=' + name + '&containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
	return _doGet(url);
}

/**
 * Get account by name like
 * 
 * @param revControlledId
 * @returns
 */
async function searchUserByLoginLike(login) {
	const uri = '/api/account/byLoginLike/?login=' + login + '&containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
	return _doGet(url);
}



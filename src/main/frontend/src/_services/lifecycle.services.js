import { _doGet, buildURLQuery, API_ROOT } from './utils/services.config';

/**
 * Export
 */
export const lifecycleService = {
    details,
};

/**
 * Get a lifecycle for a given identifier.
 * 
 * @param lifecycleId
 * @returns Promise
 */
async function details(lifecycleId) {
	const uri = 'api/lifecycle/' + lifecycleId;
	const url = `${API_ROOT}/` + uri;
	return _doGet(url);
}


import { _doGet, buildURLQuery, API_ROOT } from './utils/services.config';

/**
 * Rev controlled
 */
export const revControlledService = {
    allIterationsOf,
    allVersionsOf,
}
/**
 * All iterations of a revision controlled.
 * 
 * @param revControlledId
 * @returns
 */
async function allIterationsOf(revControlledId) {
	const uri = '/api/rc/' + revControlledId + '/iterations/?' + 'containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
	return _doGet(url);
}

/**
 * All versions of a revision controlled.
 * 
 * @param revControlledId
 * @returns
 */
async function allVersionsOf(revControlledId) {
	const uri = '/api/rc/' + revControlledId + '/versions/?' + 'containerId=:containerId';
	const url = `${API_ROOT}/` + uri;
	return _doGet(url);
}

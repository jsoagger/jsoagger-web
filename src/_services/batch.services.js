import { _doGet, _doPostMp, API_ROOT } from './utils/services.config';
/**
 * Default Export
 */
export const batchService = {
    getJobTypes,
    batchLoad,
    batchExport,
    jobCommands
};
/**
 * Get job types for a job
 */
async function getJobTypes(job){
	const uri = "api/batch/jobTypes?forJob=".concat(job).concat("&containerId=:containerId");
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
/**
 * Get job commands for a job mapping
 */
async function jobCommands(forMapping){
	const uri = "api/batch/jobCommands?forMapping=".concat(forMapping).concat("&containerId=:containerId");
	const url = `${API_ROOT}/` + uri;
    return _doGet(url);
}
/**
 * Launch a batch load job
 * 
 * @param formData
 * @returns
 */
async function batchLoad(formData){
	let uri = '/api/batch/load2'
    var url = `${API_ROOT}` + uri
	return _doPostMp(url, JSON.stringify(formData))
}

/**
 * Launch a batch export job
 * 
 * @param formData
 * @returns
 */
async function batchExport(formData){
	let uri = '/api/batch/export2'
	var url = `${API_ROOT}` + uri
	formData['output.file.name'] = 'export.txt'
	console.log('batch export :' + JSON.stringify(formData))
	return _doPostMp(url, JSON.stringify(formData))
}





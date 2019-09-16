import {sessionId}  from '../../_helpers/auth-header';

export const rootContainerId = 'MTpjb20ubmV4aXRpYS5lbWFnaW5wbGF0Zm9ybS5jb3JlLm1vZGVsLmFwaS5jb21wb3NpdGUuQXBwbGljYXRpb25Db250YWluZXI';

/*------------------------------------------------------------------------------------------------
 *
 * CALCULATE API ROOT URL ACCORDING TO HOSTNAME: API_ROOT
 * 
 *------------------------------------------------------------------------------------------------*/
//https://daveceddia.com/multiple-environments-with-react/
let backendHost = process.env.REACT_APP_BACKEND_HOST;
//const apiVersion = 'v1';
export const API_ROOT = `${backendHost}`;
console.log('API_URL :' + process.env.REACT_APP_BACKEND_HOST);
/*------------------------------------------------------------------------------------------------
*
* URI PROCESSOR
* 
*------------------------------------------------------------------------------------------------*/
/**
 * Usage buildURLQuery({name: 'x', gender: 'y'});
 * ==> name=x&gender=y
 */
export const buildURLQuery = params =>  {
	return Object.keys(params)
		.map(k => `${k}=${encodeURI(params[k])}`)
		.join('&');
};
/*------------------------------------------------------------------------------------------------
 *
 * POST QUERY ROOT
 * 
 *------------------------------------------------------------------------------------------------*/
/**
 * Constructs a default POST query.
 * 
 * @param {*} url Full URL
 * @param {*} data Data to post
 */
export const _doPost = async function(url, data) {
	let sid = JSON.stringify("sid=" + sessionId());
	let finalurl = url.replace(":containerId", getWorkingCurrentContainerId());
	if(data){
	    return fetch(finalurl, {
	        method: "POST",
	        headers: {
	        	'Content-Type': 'application/json',
	            'Accept': 'application/json',
	        },
	        body: data,
	    });
	}
	else {
		return fetch(finalurl, {
	        method: "POST",
	        headers: {
	        	'Content-Type': 'application/json',
	            'Accept': 'application/json',
	        },
	    });
	}
}
/**
 * Constructs a default POST query.
 * 
 * @param {*} url Full URL
 * @param {*} data Data to post
 */
export const _doPostMp = async function(url, data) {
	let sid = JSON.stringify("sid=" + sessionId());
	let finalurl = url.replace(":containerId", getWorkingCurrentContainerId());
	console.log('_doPostMp :' + JSON.stringify(data))
	if(data){
	    return fetch(finalurl, {
	        method: "POST",
	        headers: {
	            'Accept': 'application/json',
	        },
	        body: data,
	    });
	}
}
/*------------------------------------------------------------------------------------------------
*
* GET QUERY ROOT
* 
*------------------------------------------------------------------------------------------------*/
/**
 * Constructs a GET query.
 * 
 * @param {*} url Full URL 
 */
export const _doGet = async function(url) {
	let finalurl = url.replace(":containerId", getWorkingCurrentContainerId());
	let sid = JSON.stringify("sid=" + sessionId());
    return fetch(finalurl, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
    .then(response => {
        var json = response.json();
        return json;
    })
    .catch(error => {
        handleError(error);
    });
}
export const _doGetText = async function(url) {
	let finalurl = url.replace(":containerId", getWorkingCurrentContainerId());
	let sid = JSON.stringify("sid=" + sessionId());
    return fetch(finalurl, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
    .then(response => {
    	var myHeaders = response.headers
    	console.log('headers : ' + myHeaders)
    	for (var p of myHeaders.entries()){
    		console.log('p : ' + p)
    	}
		console.log('headers : ' + JSON.stringify(myHeaders))
    	return response.text()
    })
}
export const _doGetBlob = async function(url) {
	let finalurl = url.replace(":containerId", getWorkingCurrentContainerId());
	let sid = JSON.stringify("sid=" + sessionId());
    return fetch(finalurl, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    })
    .then(response => {
    	return response.blob()
    })
}
export const  _doPut = async function(url, data) {
	let sid = JSON.stringify("sid=" + sessionId());
	let finalurl = url.replace(":containerId", getWorkingCurrentContainerId());
	if(data){
	    return fetch(finalurl, {
	        method: "PUT",
	        headers: {
	        	'Content-Type': 'application/json',
	            'Accept': 'application/json',
	        },
	        body: JSON.stringify(data),
	    });
	}
	else {
		return fetch(finalurl, {
	        method: "PUT",
	        headers: {
	        	'Content-Type': 'application/json',
	            'Accept': 'application/json',
	        },
	    });
	}
}

function handleResponseError(response) {
    throw new Error("[ERROR] on HTTP call, status = " + response.status);
}

function handleError(error) {
    console.error("api.config.[ERROR]:" + error);
}


function getWorkingCurrentContainerId(){
	var json = JSON.parse(localStorage.getItem('workingContainer'))
	if (json) return json.id
}


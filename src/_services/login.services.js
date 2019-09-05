import { _doPost, buildURLQuery, API_ROOT } from './utils/services.config';

export const loginService = {
    login,
    logout,
    isloggedIn
};
/**
 * Login to remote server
 */
function login(formdata) {
    const url = `${API_ROOT}/anon/auth/login`;
    //console.debug("Login : " + url);
    //console.debug("Login : " + formdata);
    var bodyson = "{'USERNAME': '".concat(formdata.login)
        .concat("',").concat("'PASSWORD': '").concat(formdata.password)
        .concat("'}");
      //  console.debug('bodyson : ' + bodyson);
    return _doPost(url, bodyson);
}
/**
 * Check if current user is logged in
 */
function isloggedIn() {
    return "false";
}
/**
 * Logout and clear session
 */
function logout() {
    const url = `${API_ROOT}/auth/logout`;
    console.debug("Logout : " + url);
    localStorage.clear();
}


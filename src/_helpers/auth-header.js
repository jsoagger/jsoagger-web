
export const header = () => {
    let sessionId = localStorage.getItem('sessionId');
    console.debug("Session id in localStorage : " + sessionId);
    if (sessionId) {
        return { 'Cookie': 'sid= ' + sessionId };
    } else {
        return {};
    }
}

export const sessionId = () => {
    let sessionId = localStorage.getItem('sessionId');
    console.debug("Session id in localStorage : " + sessionId);
    if (sessionId) {
        return sessionId ;
    } else {
        return '';
    }
}

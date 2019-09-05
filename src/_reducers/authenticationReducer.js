import * as types from '_actions/actionTypes.js';

const currentUser = {
}

/**
 * See https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
 */
export const userAuthenticationReducer = (state = currentUser , action) => {
  switch(action.type) {
    case types.LOGIN_USER:
        //console.log('LOGIN_USER : ' + JSON.stringify(state))
        const session_id = action.payload.session_id;
        const account = action.payload.account;
        const details = action.payload.details;
        localStorage.setItem('user_account', account);
        localStorage.setItem('user_details', details);
        localStorage.setItem('is_administrator', true);
        return {
            ...state, 
            session_id: session_id,
            account: account,
            details: details
        };
    case types.LOGOUT_USER:
        //console.log('LOGOUT_USER : ' + JSON.stringify(state))
        localStorage.removeItem('session_id');
        localStorage.removeItem('user_account');
        localStorage.removeItem('user_details');
        return {
            ...state,
            currentUser
        };
    default:
        //console.log('userAuthenticationReducer default : ' + JSON.stringify(state))
        return currentUser;
  }
};

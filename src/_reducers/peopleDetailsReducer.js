import * as types from '_actions/actionTypes.js';
import produce from "immer"

const inialState = {
	
}
/**
 * Reducers for people details management
 */
export const peopleDetailsReducer = (state = inialState, action) => {
	  switch(action.type) {
	    case types.USER_ACCOUNT_LOCKED:
	    	const nextState = produce(state, locked => {
	    		locked.accountLocked = true
			})
	    	return nextState
	    case types.USER_ACCOUNT_UNLOCKED:
	    	const ns = produce(state, unlocked => {
	    		unlocked.accountLocked = false
			})
			return ns
	    case types.USER_ACCOUNT_UPDATE_PASS:
	    	return {
	    	...state,
	    		'coco': 'radoums'
    		}
	    default:
	    	return state;
	  }
}
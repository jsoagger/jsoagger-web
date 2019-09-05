import * as types from '_actions/actionTypes.js';
import produce from "immer"

const containers = {
}
/**
 * See https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
 */
export const currentContainerReducer = (state = containers , action) => {
  switch(action.type) {
    case types.SET_USER_WORKING_CONTAINER:
        var container = action.payload
        // console.log('workingContainer : ' + JSON.stringify(container))
        // console.log('State:' + JSON.stringify(state))
        localStorage.setItem('workingContainer', container);
        return {
            ...state, 
            workingContainer: container
        };
    case types.SET_APPLICATION_CONTAINER:
        var container = action.payload ? action.payload.applicationContainer : {}
        // console.log('applicationContainer : ' + JSON.stringify(container))
        // console.log('State:' + JSON.stringify(state))
        localStorage.setItem('applicationContainer', container);
        return {
            ...state, 
            applicationContainer: container
        }
    case types.SWITCH_TO_CONTAINER:
    	const ns = produce(state, container => {
    		container.currentContainer = action.payload	
		})
		localStorage.setItem('workingContainer', action.payload);
		return ns
    default:
        return containers;
  }
};

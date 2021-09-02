import * as types from './action';
import { REHYDRATE} from 'redux-persist'


export const initialState = {
    auth:null,
    user:null,

};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action = {}) => {

        switch(action.type){
            case types.LOGINUSER:
                return { ...state, auth:action.payload.auth, user:action.payload.user}  
            case REHYDRATE:{console.log(action, action.payload)
                return action?.payload?.authReducer ?{...state, ...action.payload.authReducer}: {...state}}
            

            default:
                return { ...state };   
    }

};
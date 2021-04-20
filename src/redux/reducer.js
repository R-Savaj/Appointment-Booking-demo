import { actionType } from "./constant";

const intialValue = {
    items:[],
    loading:false,
    error:null
};
export const eventReducer = (state=intialValue,action)=>{
    switch(action.type){
        case actionType.FREESLOT_GET_REQUEST:
            return {
                ...state,
                loading:true,
                error:null
            }
        case actionType.FREESLOT_GET_SUCCESS:
            return {
                ...state,
                loading:false,
                items:action.payload
            }        
        case actionType.FREESLOT_GET_ERROR:
            return {
                ...state,
                loading:false,
                error:action.error
            }       
    }
}
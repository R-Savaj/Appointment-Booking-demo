import {actionType} from "./constant"
import axios from "axios";
const baseUrl = 'http://52.90.85.191:3000';

export const findFreeSlot=(param)=>{
    return async(dispatch)=>{
        dispatch({type:actionType.FREESLOT_GET_REQUEST})
        await axios.get(`${baseUrl}/availabilities?date=${param.dateTime}&timezone=${param.timeZone}`)
        .then((response)=>{
            dispatch({
                type:actionType.FREESLOT_GET_SUCCESS,
                payload:response.data.data.availability  
            })
        }).catch((error)=>{
            dispatch({
                type:actionType.FREESLOT_GET_ERROR,
                error:error.response  
            })
        })
    }
}
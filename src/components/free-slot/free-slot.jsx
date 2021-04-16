import React from 'react';
import { useHistory } from "react-router-dom";
import {toast} from 'react-toastify'; 
import moment from 'moment';

import { appointmentService } from '../../services/appointment-booking';

toast.configure() 
function FreeSlot(props){
    let history = useHistory();
    const freeSlotTime = props.freeSlot;
    const duration = props.duration;
    const freeSlotArray=[];
    freeSlotTime.forEach(element => {
        let data={key:new Date(element).toISOString(),value: moment(element).format('LT')}
        if(data.value.indexOf('AM') === -1){
            data.meridiem='PM'
        }else{
            data.meridiem='AM'
        }
       freeSlotArray.push(data)
    });
    function submitSelectedDate(data){
       let payload={
            'startTime':data,
            'duration':duration
        }
        appointmentService.createEvent(payload).then((res)=>{
            console.log(res);
            if(res.status === 200){
                toast.success('Event generated successfully')
                history.push("/show-event");
            }
        })
        .catch((err)=>{
             if (err.response.status === 500){
                toast.warning(err.response.data.details.body[0].message)
             }
             if(err.response.status === 422){
                toast.warning(err.response.data.message)
             }
        })

    }
    return(
        <div>
            <div><span>Available Strating times for&nbsp;<b>{moment(props.dateTime).format('MMMM Do YYYY')}</b></span></div>
            <div className="row">
                <div className="mr-5">
                 <div className="text-center"><b>AM</b></div>
                    {freeSlotArray.map(function(data, i){ 
                        if(data.meridiem === 'AM')
                        return( 
                            <div className="row mt-3">
                                <button key={i} onClick={()=>submitSelectedDate(data.key)} className="btn border-dark w-100">{data.value}</button>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <div className="text-center"><b>PM</b></div>
                    {freeSlotArray.map(function(data, i){ 
                        if(data.meridiem === 'PM')
                        return( 
                            <div className="row mt-3">
                                <button key={i} onClick={()=>submitSelectedDate(data.key)} className="btn border-dark w-100">{data.value}</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FreeSlot;
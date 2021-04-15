import moment from 'moment';
import React from 'react';

import { appointmentService } from '../../services/appointment-booking';

const FreeSlot=(props)=>{
    const freeSlotTime = props.freeSlot;
    const duration = props.duration;
    const freeSlotArray=[];
    freeSlotTime.forEach(element => {
        let data={key:element,value: moment(element).format('LT')}
        if(data.value.indexOf('AM') === -1){
            data.meridiem='PM'
        }else{
            data.meridiem='AM'
        }
       freeSlotArray.push(data)
       console.log(freeSlotArray);
    });
    function submitSelectedDate(data){
       let payload={
            'startTime':data,
            'duration':duration
        }
        appointmentService.createEvent(payload).then((res)=>{
            console.log(res);
         })
         .catch((err)=>{
             console.log('error',err);    
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
                                <button key={data.key} onClick={()=>submitSelectedDate(data.key)} className="btn border-dark w-100">{data.value}</button>
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
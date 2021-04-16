import React,{useState} from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { Link } from 'react-router-dom';

import { appointmentService } from '../../services/appointment-booking';
import FreeSlot from '../free-slot/free-slot';

const BookEvent=()=>{
    const [intialValue, setIntialValue] = useState({
        dateTime:new Date().toISOString(),
        duration:null,
        timeZone:'Asia/Kolkata'
    });
    const [freeSlot, setFreeSlot] = useState([]);
    const timeZone=[
        {key:'Asia/Kolkata',value:'GMT+05:30 Asia/Kolkata (IST)'},
        {key:'America/Los_Angeles',value:'GMT-08 America/Los_Angeles (PST)'},
        {key:'Australia/Sydney',value:'GMT+10 Australia/Sydney (EST)'}  
    ]
    const selectDateTime=(event)=>{
        setIntialValue({...intialValue,dateTime:event._d.toISOString()});
    }
    const selectTimeZone = (event)=>{
        setIntialValue({...intialValue,timeZone:event.target.value});
    }   
    const submitEvent=(event)=>{
        event.preventDefault();
        setFreeSlot([]);
        appointmentService.findFreeSlot(intialValue).then((res)=>{
           setFreeSlot(res.data.data.availability);
        })
        .catch((err)=>{
            console.log('error',err);    
        })
    }
    return(
        <div>
            <div className="row">
                <div className="col-md-6">
                    <div className="container">
                        <h2>Pick Date and Time</h2>
                        <form onSubmit={submitEvent}>
                            <div className="form-group">
                                <Datetime input={false} onChange={selectDateTime} timeFormat={false}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="duration">Duration:</label>
                                <input type="text" className="form-control" id="duration" onChange={(event)=>setIntialValue({...intialValue,duration:event.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="timezone">TimeZone:</label>
                                <select className="form-control" onChange={selectTimeZone}>
                                {timeZone.map(function(data, key){  return (
                                    <option key={key} value={data.key}>{data.value}</option> )
                                })}
                                </select>
                            </div>
                            <button className="btn btn-success" >Find Available Slot</button>
                            <Link to="/show-event" className="btn btn-success ml-5">Show Existing Event</Link>
                        </form> 
                    </div>
                </div>
                <div className="col-md-6">
                {freeSlot.length > 0 ?
                    <FreeSlot freeSlot={freeSlot} duration={intialValue.duration} selecteddate={intialValue.dateTime}/>:
                ''}
                </div>
            </div>
            <div>
              
            </div>
        </div>
    )
}

export default BookEvent;
import React,{useState} from 'react';
import moment from 'moment';
import DatetimeRangePicker from 'react-datetime-range-picker';

import { appointmentService } from '../../services/appointment-booking';

const ShowEvent=()=>{
   const [bookedAppointment, setbookedAppointment] = useState([]);
   const [dateRange, setdateRange] = useState({
    startDate:new Date(new Date().setHours(0,0,0,0)).toISOString(),
    endDate:new Date(new Date().setHours(23,59,59,999)).toISOString(),
   }) 
    const selectDateRange=(event)=>{
        setdateRange(
            {...dateRange,
                startDate:new Date(new Date(event.start).setHours(0,0,0,0)).toISOString(),
                endDate:new Date(new Date(event.end).setHours(23,59,59,999)).toISOString()
            }
        )
    }

    const bookedEvent=async()=>{
        setbookedAppointment([]);
        await appointmentService.showEvent(dateRange).then((res)=>{
            setbookedAppointment(res.data.data.appointments);
        })
        .catch((err)=>{
            console.log('error',err);    
        })
        
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="w-25">
                            <DatetimeRangePicker onChange={selectDateRange} timeFormat={false} input={false} closeOnSelect={true}/>
                        </div>
                        <button className="btn btn-success mt-4" onClick={bookedEvent}>Find Booked Event</button>
                    </div>
                     <div className="col-md-6">
                        <h2>Booked Appointment Time</h2>
                        {bookedAppointment.map(function(data, i){ 
                         return <div key={i}>Date &nbsp;{moment(data.startTime).format('MM/DD/YYYY')} From&nbsp;{moment(data.startTime).format('LT')} To&nbsp;{moment(data.endTime).format('LT')}</div>
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ShowEvent;
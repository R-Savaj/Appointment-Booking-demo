import React,{useState} from 'react';
import moment from 'moment';
import DatetimeRangePicker from 'react-datetime-range-picker';

import { appointmentService } from '../../services/appointment-booking';

const ShowEvent=()=>{
   const [bookedAppointment, setbookedAppointment] = useState([]);
   const dateRange = {
       startDate:moment().format(),
       endDate:moment().format()
   }
    const selectDateRange=(event)=>{
        dateRange.startDate = moment(event.start).format()
        dateRange.endDate = moment(event.end).format()
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
                        <h2>Booked Appointment Time</h2>{bookedAppointment.length}
                        {bookedAppointment.map(function(data, i){ 
                          <div key={i}>Date &nbsp;{moment(data.startTime).format('MM/DD/YYYY')} From&nbsp;{moment(data.startTime).format('LT')} To&nbsp;{moment(data.endTime).format('LT')}</div>
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ShowEvent;
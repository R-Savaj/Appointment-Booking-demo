import React,{useState,useEffect} from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import FreeSlot from '../free-slot/free-slot';
import {toast} from 'react-toastify';
import { Formik, Field, Form, ErrorMessage, setIn } from 'formik';
import * as Yup from 'yup';
import {CustomSelect} from '../select-field/custom-select';
import momentTimezone from 'moment-timezone';
import {findFreeSlot} from '../../redux/action'

toast.configure() 
const BookEvent=()=>{
    const [intialValue, setIntialValue] = useState({
        dateTime:new Date().toISOString(),
        duration:'',
        timeZone:''
    });
    const [freeSlot, setFreeSlot] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const state = useSelector(state=>state);
    const timeZones = momentTimezone.tz.names();
    const offsetTmz=[]; 
    for(let i in timeZones){
        offsetTmz.push({label:"(GMT"+momentTimezone.tz(timeZones[i]).format('Z')+") " + timeZones[i],value:timeZones[i]});
    }
    useEffect(() => {
        setFreeSlot([]);
        if(state){
            setLoading(state.loading);
            if(state.items){
                setFreeSlot(state.items);
            }
            if(state.error){
                toast.warning('Something went wrong.Please try again')
            }
        }
       
    }, [state])
    const validationSchema = Yup.object().shape({
        duration: Yup.string()
            .required('Duriations is required'),
        timeZone:Yup.string() 
             .required('Please select timezone')
    });
    const selectDateTime=(event)=>{
        setIntialValue({...intialValue,dateTime:event._d.toISOString()});
    }
    const submitEvent=(event)=>{
        setIntialValue(event);
        setFreeSlot([]);
        dispatch(findFreeSlot(event));
    }
    return(
        <div className="ml-lg-auto w-75">
            <div className="row">
                <div className="col-md-6">
                    <div className="container">
                        <h2>Pick Date and Time</h2>
                        <Formik initialValues={intialValue} validationSchema={validationSchema} onSubmit={submitEvent} enableReinitialize>
                         {({ errors, touched}) => {
                         return (
                             <Form>
                                <div className="form-group">
                                    <Datetime input={false} onChange={selectDateTime} timeFormat={false}/>
                                </div>
                                <div className="form-group">
                                    <label>Duration</label>
                                    <Field name="duration" type="text" className={'form-control' + (errors.duration && touched.duration ? ' is-invalid' : '')} />
                                    <ErrorMessage name="duration" component="div" className="invalid-feedback" />
                                </div>
                                <div>
                                    <label htmlFor="timeZone">TimeZone:</label>
                                    <Field
                                        className={(errors.timeZone && touched.timeZone ? ' is-invalid' : '')}
                                        name="timeZone"
                                        options={offsetTmz}
                                        component={CustomSelect}
                                        placeholder="Select a language..."
                                    
                                    />
                                    <ErrorMessage name="timeZone" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group mt-4">
                                    <button type="submit" className="btn btn-primary">Find Available Slot</button>
                                    <Link to="/show-event" className="btn btn-success ml-5">Show Existing Event</Link>
                                </div>
                            </Form>
                        );
                        }}
                    </Formik>
                </div>
            </div>
            <div className="col-md-6">
                {loading ? 'Loading.....' : freeSlot.length > 0 ?
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
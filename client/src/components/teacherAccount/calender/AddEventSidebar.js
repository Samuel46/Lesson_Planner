import React, { useState, Fragment, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  CustomInput,
  Input,
  Form,
} from "reactstrap";
import Alert from "../../layouts/Alert";
import {
  fetchLessons, updateLesson, deleteLesson
} from "../../../actions/lessonPlanner/calender";

import Avatar from "../../../@core/components/avatar";
import classnames from "classnames";
import { toast } from "react-toastify";
import Flatpickr from "react-flatpickr";
import { X, Check, Trash } from "react-feather";
import Select, { components } from "react-select";
import { useForm, Controller } from "react-hook-form";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// ** Toast Component
const ToastComponent = ({ title, icon, color }) => (
  <Fragment>
    <div className="toastify-header pb-0">
      <div className="title-wrapper">
        <Avatar size="sm" color={color} icon={icon} />
        <h6 className="toast-title">{title}</h6>
      </div>
    </div>
  </Fragment>
);

// ########
function AddEventSidebar({
  open,
  handleAddEventSidebar,
  refetchEvents,
  createLesson,
  calendarApi,
  selectedEvent,
  calendarsColor,
  loadingLessonById,
  fetchLessons,
  updateLesson,
  loading,
  deleteLesson

}) {
  const { register, errors, handleSubmit } = useForm();
  const isObjEmpty = obj => Object.keys(obj).length === 0

  // ** React Select Theme Colors
const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})



  // add the selectedEvent here


  // ** Select Options
  const options = [
    { value: 'Lessons', label: 'Lessons', color: 'primary' },
    { value: 'Curriculum', label: 'Curriculum', color: 'danger' },
    { value: 'Homework', label: 'Homework', color: 'warning' },
    { value: 'Objectives', label: 'Objectives', color: 'success' },
    { value: 'Procedures', label: 'Procedures', color: 'info' }
  ]

  // ** States
  // const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [guests, setGuests] = useState({});
  const [allDay, setAllDay] = useState(false);
  const [location, setLocation] = useState("");
  const [endPicker, setEndPicker] = useState(new Date());
  const [startPicker, setStartPicker] = useState(new Date());
  const [value, setValue] = useState([
    { value: "Lessons", label: "Lessons", color: "primary" },
  ]);

  // ** Custom select components
  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <span className={`bullet bullet-${data.color} bullet-sm mr-50`}></span>
        {data.label}
      </components.Option>
    );
  };

  // ** Adds New Lesson Event
  const handleAddEvent = () => {
    const obj = {
      title,
      start: startPicker,
      end: endPicker,
      allDay,
      display: "block",
      calenderType: value[0].label,
      // url: url.length ? url : undefined,
      guests: guests.length ? guests : undefined,
      location: location.length ? location : undefined,
      description: desc.length ? desc : undefined,
    };
    // the add lesson function here from the action
    createLesson(obj);
    // e.preventDefault();
    refetchEvents();
    handleAddEventSidebar();
    toast.success(<ToastComponent title='Event Added' color='success' icon={<Check />} />, {
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false
    })
  };

  // ** Reset Input Values on Close
  const handleResetInputValues = () => {
   
    setTitle("");
    setAllDay(false);
    // setUrl("");
    setLocation("");
    setDesc("");
    setGuests({});
    setValue([{ value: "Lessons", label: "Lessons", color: "primary" }]);
    setStartPicker(new Date());
    setEndPicker(new Date());
  };

  useEffect(() => {
   handleResetInputValues( loadingLessonById !== false)
  }, [ loadingLessonById !== false])

    // ** Set sidebar fields
    const handleSelectedEvent = () => {
      if (loadingLessonById !== true) {
        const calendar = selectedEvent.calenderType
  
        const resolveLabel = () => {
          if (calendar.length) {
            return { label: calendar, value: calendar, color: calendarsColor[calendar] }
          } else {
            return { value: 'Lessons', label: 'Lessons', color: 'primary' }
          }
        }
        setTitle(selectedEvent.title && selectedEvent.title||  title)
        setAllDay(selectedEvent.allDay && selectedEvent.allDay || allDay)
        // setUrl(selectedEvent.url && selectedEvent.url || url)
        // setLocation(selectedEvent.extendedProps.location || location)
        setDesc(selectedEvent.description && selectedEvent.description || desc)
        // setGuests(selectedEvent.extendedProps.guests || guests)
        setStartPicker(new Date(selectedEvent.start && selectedEvent.start))
        setEndPicker(selectedEvent.allDay  && selectedEvent.allDay ? new Date(selectedEvent.start && selectedEvent.start) : new Date(selectedEvent.end && selectedEvent.end))
        setValue([resolveLabel()])
      }
    }
  
 
  
  // ** Updates Event in Store
  const handleUpdateEvent = () => {
    const eventToUpdate = {
      
      title,
      allDay,
      start: startPicker,
      end: endPicker,
      
      extendedProps: {
        location,
        description: desc,
        guests,
        calenderType: value[0].label
      }
   
    }

    const propsToUpdate = [ 'title', 'url']
    const extendedPropsToUpdate = ['calendar', 'guests', 'location', 'description']
  
    updateLesson(eventToUpdate)
    // updateEventInCalendar(eventToUpdate, propsToUpdate, extendedPropsToUpdate)
    handleAddEventSidebar()
    toast.success(<ToastComponent title='Event Updated' color='success' icon={<Check />} />, {
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false
    })
  }

    useEffect(() => {
    handleSelectedEvent(selectedEvent.title, loadingLessonById !== true)
  
    }, [selectedEvent.title, loadingLessonById !== true])
    
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleAddEventSidebar} />
  );


    // ** (UI) removeEventInCalendar
    // const removeEventInCalendar = eventId => {
    //   calendarApi.getEventById(eventId).remove()
    // }
  const handleDeleteEvent = () => {
    deleteLesson(selectedEvent._id)
    // removeEventInCalendar(selectedEvent._id)
    handleAddEventSidebar()
    toast.error(<ToastComponent title='Event Removed' color='danger' icon={<Trash />} />, {
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false
    })
  }

   // ** Event Action buttons
  const EventActions = () => {
    if ( loadingLessonById !== false ) {
      return (
        <Fragment>
          <Button className='mr-1' type='submit' color='primary'>
            Add
          </Button>
          <Button color='secondary' type='reset' onClick={handleAddEventSidebar} outline>
            Cancel
          </Button>
        </Fragment>
      )
    } else  {
      return (
        <Fragment>
          
          <Button color='danger' onClick={handleDeleteEvent}  outline>
            Delete
          </Button>
        </Fragment>
      )
    }
  }

;
  return (
    <div>
      <Modal
        isOpen={open}
        toggle={handleAddEventSidebar}
        className="sidebar-lg"
        contentClassName="p-0"
        onOpened={handleSelectedEvent}
        onClosed={handleResetInputValues}
        modalClassName="modal-slide-in event-sidebar"
      >
        <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>
          { loadingLessonById !== true ? 'Delete' : 'Add'} Lesson
        </h5>
      </ModalHeader>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
          <Form
          
          onSubmit={handleSubmit(data => {
        
              if (loadingLessonById !== false) {
                handleAddEvent()
              } else {
                handleUpdateEvent()
              }
              handleAddEventSidebar()
            
          })}
          
          >
            <Alert />
            <FormGroup>
              <Label for="title">
                Title <span className="text-danger">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
             
              />
            </FormGroup>

            <FormGroup>
              <Label for="label">Label</Label>
              <Select
                id="label"
                value={value}
                options={options}
                theme={selectThemeColors}
                className="react-select mb-4"
                classNamePrefix="select"
                isClearable={false}
                onChange={(data) => setValue([data])}
                components={{
                  Option: OptionComponent,
                }}
              />
            </FormGroup>
          

            <FormGroup>
              <Label for="startDate">Start Date</Label>
              <Flatpickr
                required
                id="startDate"
                tag={Flatpickr}
                name="startDate"
                className="form-control"
                onChange={(date) => setStartPicker(date[0])}
                value={startPicker}
                options={{
                  enableTime: allDay === false,
                  dateFormat: "Y-m-d H:i",
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="endDate">End Date</Label>
              <Flatpickr
                required
                id="endDate"
                name="endDate"
                className="form-control"
                onChange={(date) => setEndPicker(date[0])}
                value={endPicker}
                options={{
                  enableTime: allDay === false,
                  dateFormat: "Y-m-d H:i",
                }}
              />
            </FormGroup>

            <FormGroup>
              <CustomInput
                type="switch"
                id="allDay"
                name="customSwitch"
                label="All Day"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
                inline
              />
            </FormGroup>

            {/* <FormGroup>
              <Label for="eventURL">Event URL</Label>
              <Input
                type="url"
                id="eventURL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.google.com"
              />
            </FormGroup> */}

            {/* <FormGroup>
              <Label for="guests">Guests</Label>
            </FormGroup> */}

            <FormGroup>
              <Label for="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Office"
              />
            </FormGroup>

            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="text"
                id="description"
                rows="3"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Description"
              />
            </FormGroup>
            <FormGroup className="d-flex">
              <EventActions />
              
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

AddEventSidebar.propTypes = {
  selectedEvent: PropTypes.object.isRequired,
  loadingLessonById: PropTypes.bool.isRequired,
  fetchLessons: PropTypes.func.isRequired,
  updateLesson: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  deleteLesson:  PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  selectedEvent: state.calender.selectedEvent,
  loadingLessonById: state.calender.loadingLessonById,
  loading: state.calender.loading

})

export default connect(mapStateToProps, {fetchLessons,deleteLesson, updateLesson}) (AddEventSidebar);

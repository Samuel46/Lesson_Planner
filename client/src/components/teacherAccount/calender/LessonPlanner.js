import React, { useEffect, useRef, memo, Fragment, useState } from "react";

// ** Full Calendar & it's Plugins
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Avatar from "../../../@core/components/avatar";
import Alert from "../../layouts/Alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  selctedLesson,
  fetchLessons,
} from "../../../actions/lessonPlanner/calender";
// ** Third Party Components
import { toast } from "react-toastify";
import { Card, CardBody } from "reactstrap";
import { Menu, Check } from "react-feather";
import { Link } from "react-router-dom";

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

function LessonPlanner({

  calendarsColor,
  calendarApi,
  setCalendarApi,
  handleAddEventSidebar,
  blankEvent,
  toggleSidebar,
  selctedLesson,

  lessonEvents,
  fetchLessons,
  createLesson,

  selectedCalendars
}) {
  // ** Refs
  const calendarRef = useRef(null);

  // useEffect(() => {
  //   fetchLessons(selctedLesson);
  // }, [ fetchLessons, selctedLesson, createLesson]);

  useEffect(() => {
    fetchLessons(selctedLesson);
  }, [  selctedLesson]);

  // ** UseEffect checks for CalendarAPI Update
  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current.getApi());
    }
  }, [calendarApi]);

  // ** calendarOptions(Props)
  const calendarOptions = {
    events: lessonEvents.length ? lessonEvents : [],
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      start: "sidebarToggle, prev,next, title",
      end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: true,

    /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
    eventResizableFromStart: true,

    /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
    dragScroll: true,

    /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
    dayMaxEvents: 6,

    /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
    navLinks: true,

    eventClassNames({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle

      const colorName =
        calendarsColor[calendarEvent._def.extendedProps.calenderType];

      return [
        // Background Color
        `bg-light-${colorName}`,
      ];
    },

    eventClick({ event: clickedEvent }) {
      // console.log(clickedEvent, 'youuuuuuuuuuuuoououoouuouuuooo');

      selctedLesson(clickedEvent._def.extendedProps._id);
      handleAddEventSidebar();
      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        text: <Menu className="d-xl-none d-block" />,
        click() {
          toggleSidebar(true);
        },
      },
    },

    dateClick(info) {
      const ev = blankEvent;
      ev.start = info.date;
      ev.end = info.date;
      fetchLessons(ev)
      
      handleAddEventSidebar();
     
      
    },

    /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
    eventDrop({ event: droppedEvent }) {
      // dispatch(updateEvent(droppedEvent))
      toast.success(
        <ToastComponent
          title="Event Updated"
          color="success"
          icon={<Check />}
        />,
        {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
        }
      );
    },

    /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize({ event: resizedEvent }) {
      // dispatch(updateEvent(resizedEvent))
      toast.success(
        <ToastComponent
          title="Event Updated"
          color="success"
          icon={<Check />}
        />,
        {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
        }
      );
    },

    ref: calendarRef,

    // Get direction from app state (store)
    // direction: isRtl ? 'rtl' : 'ltr'
  };

  return (
    <Card className="shadow-none border-0 mb-0 rounded-0">
      <CardBody className="pb-0">
        <Alert />
        <FullCalendar {...calendarOptions} />{" "}
      </CardBody>
    </Card>
  );
}
LessonPlanner.propTypes = {
  selctedLesson: PropTypes.func.isRequired,
  selectedEvent: PropTypes.object.isRequired,
  lessonEvents: PropTypes.object.isRequired,
  fetchLessons: PropTypes.func.isRequired,
  selectedCalendars: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  selectedEvent: state.calender.selectedEvent,
  lessonEvents: state.calender.lessonEvents,
  selectedCalendars: state.calender.selectedCalendars
});

export default connect(mapStateToProps, { selctedLesson,fetchLessons })(
 memo(LessonPlanner) 
);

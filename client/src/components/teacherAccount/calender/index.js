import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Third party Components

import classnames from "classnames";
import { Row, Col } from "reactstrap";

// calender app component imports
import LessonPlanner from "./LessonPlanner";
import SidebarLeft from "./SidebarLeft";
import AddEventSidebar from "./AddEventSidebar";
import {
  createLesson,
  fetchLessons,
} from "../../../actions/lessonPlanner/calender";

// ** CalendarColors
const calendarsColor = {
  Lessons: 'primary',
  Objectives: 'success',
  Curriculum: 'danger',
  Homework: 'warning',
  Procedures: 'info'
}

function CalendarComponent({
  createLesson,
  calender,
  selectedCalendars,
  fetchLessons,
  lessonEvents
}) {
  // state
  const [addSidebarOpen, setAddSidebarOpen] = useState(false),
    [leftSidebarOpen, setLeftSidebarOpen] = useState(false),
    [calendarApi, setCalendarApi] = useState(null);

  // ** AddEventSidebar Toggle Function
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen);
  // ** LeftSidebar Toggle Function
  const toggleSidebar = (val) => setLeftSidebarOpen(val);

  // ** Blank Event Object
  const blankEvent = {
    title: "",
    start: "",
    end: "",
    allDay: false,
    url: "",
    calenderType: "",
    guests: [],
    location: "",
    description: "",
  };

  // ** refetchEvents
  const refetchEvents = () => {
    if (calendarApi !== null) {
      calendarApi.refetchEvents();
    }
    
  };

  // ** Fetch Events On Mount
  useEffect(() => {
    fetchLessons( selectedCalendars);
  }, []);



  return (
    <Fragment>
      <div className="app-calendar overflow-hidden border">
        <Row noGutters>
          <Col
            id="app-calendar-sidebar"
            className={classnames(
              "col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column",
              {
                show: leftSidebarOpen,
              }
            )}
          >
            <SidebarLeft
              calender={calender}
              // updateFilter={updateFilter}
              toggleSidebar={toggleSidebar}
              //   updateAllFilters={updateAllFilters}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
          <Col className="position-relative">
            <LessonPlanner
              blankEvent={blankEvent}
              calendarApi={calendarApi}
              calender={calender}
              createLesson={createLesson}
              refetchEvents={refetchEvents}
              // selectEvent={selectEvent}
              // updateEvent={updateEvent}
              toggleSidebar={toggleSidebar}
              calendarsColor={calendarsColor}
              setCalendarApi={setCalendarApi}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
          <div
            className={classnames("body-content-overlay", {
              show: leftSidebarOpen === true,
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>
      <AddEventSidebar
        calender={calender}
        createLesson={createLesson}
        open={addSidebarOpen}
        //   selectEvent={selectEvent}
        //   updateEvent={updateEvent}
        //   removeEvent={removeEvent}
        calendarApi={calendarApi}
        refetchEvents={refetchEvents}
        calendarsColor={calendarsColor}
        handleAddEventSidebar={handleAddEventSidebar}
      />
    </Fragment>
  );
}

CalendarComponent.propTypes = {
  createLesson: PropTypes.func.isRequired,
  calender: PropTypes.object.isRequired,
  fetchLessons: PropTypes.func.isRequired,
  selectedCalendars: PropTypes.array.isRequired,
  lessonEvents: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  calender: state.calender,
  selectedCalendars: state.calender.selectedCalendars,
  lessonEvents: state.calender.lessonEvents
});

export default connect(mapStateToProps, { createLesson, fetchLessons })(
  CalendarComponent
);

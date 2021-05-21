import React, { Fragment, useEffect } from "react";

// ** Custom Components
import classnames from "classnames";
import { CardBody, Button, CustomInput } from "reactstrap";
import {connect} from 'react-redux'
import PropTypes from "prop-types"
import {Link } from 'react-router-dom'
import illustration from "../../../assets/images/pages/calendar-illustration.png";
import { fetchLessons, updateFilter, updateAllFilters } from "../../../actions/lessonPlanner/calender";
import { X } from "react-feather";


// ** Filters Checkbox Array
const filters = [
  {
    label: "Curriculum",
    color: "danger",
    className: "custom-control-danger mb-1",
  },
  {
    label: "Lessons",
    color: "primary",
    className: "custom-control-primary mb-1",
  },
  {
    label: "Homework",
    color: "warning",
    className: "custom-control-warning mb-1",
  },
  {
    label: "Objectives",
    color: "success",
    className: "custom-control-success mb-1",
  },
  { label: "Procedures", color: "info", className: "custom-control-info" },
];

function SidebarLeft({ handleAddEventSidebar, toggleSidebar,selectedCalendars ,fetchLessons, lessonEvents, updateFilter, updateAllFilters }) {
  

console.log(selectedCalendars)
  // ** Function to handle Add Event Click
  const handleAddEventClick = () => {
    toggleSidebar( true );
    fetchLessons()
    handleAddEventSidebar();
    
  };

    return (
    <Fragment>
      <div className="sidebar-wrapper">
        <CardBody className="card-body d-flex justify-content-center my-sm-0 mb-3">
          <Button color="primary" block onClick={handleAddEventClick}>
            <span className="align-middle">Add Lesson</span>
          </Button>
         
      
        </CardBody>
        <CardBody>
          <h5 className="section-label mb-1">
            <span className="align-middle">Filter</span>
          </h5>
          <CustomInput
            type="checkbox"
            className="mb-1"
            label="View All"
            id="view-all"
            checked={selectedCalendars.length === filters.length}
            onChange={e => updateAllFilters(e.target.checked)}
          />
          <div className="calendar-events-filter">
            {filters.length &&
              filters.map((filter) => {
                return (
                  <CustomInput
                    type="checkbox"
                    key={filter.label}
                    id={filter.label}
                    label={filter.label}
                    checked={selectedCalendars.includes(filter.label)}
                    className={classnames({
                      [filter.className]: filter.className,
                    })}
                    onChange={e => updateFilter(filter.label)}
                  />
                );
              })}
          </div>
          <Link to='/teacher-dashboard' color="secondary" className="btn btn-secondary mt-4" inline >
            <span className="align-middle">Dashboard</span>
          </Link>
        </CardBody>
        
      </div>
      <div className="mt-auto">
        <img className="img-fluid" src={illustration} alt="illustration" />
      </div>
    </Fragment>
  );
}

SidebarLeft.propTypes = {
  fetchLessons: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  selectedCalendars: PropTypes.object.isRequired,
  updateAllFilters: PropTypes.func.isRequired,
  lessonEvents: PropTypes.array.isRequired,
}


const mapStateToProps = state => ({
  selectedCalendars: state.calender.selectedCalendars,
  lessonEvents: state.calender.lessonEvents
})
export default  connect (mapStateToProps, {fetchLessons, updateFilter, updateAllFilters}) (SidebarLeft);

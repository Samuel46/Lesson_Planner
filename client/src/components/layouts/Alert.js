import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

function Alert({ alerts }) {
    return (
        alerts !== null && alerts.length > 0 && alerts.map(alert => (
            
            <div className="demo-spacing-0 mb-1 ">
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            <div className="alert-body">
                {alert.msg}

                </div>
            </div>
            </div>
           
        ))
    )
}




Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)

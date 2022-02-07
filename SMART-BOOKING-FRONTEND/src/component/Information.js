import React from 'react';
import { Link } from 'react-router-dom'
const Information = () => {
    return <div className="jumbotron p-5">
        <h1 className="display-4">Information!</h1>
        <p className="lead">In the app, Click on the camera button to open the phone camera and take a Snap in portrait mode only of the blue part. Click on next to scan for the data. This will fetch the data in the editable format. Click on save to save the data.</p>
        <hr className="my-4"/>
            <p>Click the below button to know the format of the booking slip.</p>
            <p className="lead">
                <Link to="/Slip" className="btn btn-primary btn-lg"  role="button">Booking Slips</Link>
            </p>
    </div>;
};

export default Information;

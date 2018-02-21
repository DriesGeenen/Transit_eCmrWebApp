import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = (props) => {
    return(
        <div className="center marginTop-100">
            <div className="table-container">
                <Link to={`/current`} className="table-item first">Current CMR</Link>
            </div>
            <div className="table-container marginTop-20">
                <Link to={`/finished`} className="table-item first">Finished CMR's</Link>
            </div>
        </div>
    );
};

export default Dashboard;

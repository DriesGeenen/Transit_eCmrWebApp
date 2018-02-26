import React from 'react';
import { Link } from 'react-router-dom';

const EcmrReader = ({ ecmrs, finished }) => {
    var title = "Current ECMR's";
    if(finished === "finished"){
        title = "Finished ECMR's";
    }

    var output = ecmrs.map ( (ecmr, i) => {
        return (
            <tr key={i}>
                <td>{ecmr.receiver.company}</td>
                <td>{ecmr.receiver.location.city}</td>
                <td>{ecmr.receiver.location.postal}</td>
                <td><Link to={`/details/`+ecmr._id}>More information</Link></td>
            </tr>
        )
    });

    return (
        <div>
            <h2 className="page-header">{title}</h2>
            <div className="table-responsive marginTop-20">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Company</th>
                            <th scope="col">City</th>
                            <th scope="col">Postal code</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {output}
                    </tbody>
                </table>
                <Link className="btn btn-default orangeColor" to={`/dashboard`}>Go back</Link>
            </div>
        </div>
    );

};

export default EcmrReader;

import React from 'react';
import { Link } from 'react-router-dom';

const EcmrReader = ({ ecmrs }) => {
    var output = ecmrs.map ( (ecmr, i) => {
        return (
            <tr key={i}>
                <td>{ecmr.receiver.company}</td>
                <td>{ecmr.receiver.location.city}</td>
                <td>{ecmr.receiver.location.postal}</td>
            </tr>
        )
    });

    return (
        <div>
            <h2 className="page-header">ECMR's</h2>
            <div className="table-responsive marginTop-20">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Company</th>
                            <th scope="col">City</th>
                            <th scope="col">Postal code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {output}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default EcmrReader;

import React from 'react';

const Slip = () => {
    return <div className='container p-2'>
        <table className="table mx-auto" style={{ maxWidth: '300px' }}>
            <thead>
                <tr>
                    <th scope="col">Door Delivery</th>
                    <th scope="col">YES</th>
                    <th scope="col">NO</th>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row"></th>
                    <td><i className='bx bx-checkbox' style={{ fontSize: '25px' }}></i></td>
                    <td><i className='bx bx-checkbox' style={{ fontSize: '25px' }}></i></td>

                </tr>
            </tbody>
            </table>
            <table className="table mx-auto" style={{ maxWidth: '300px' }}>
            
            <thead>
                <tr>
                    <th scope="col">Secure OTP Delivery</th>
                    <th scope="col">YES</th>
                    <th scope="col">NO </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row"></th>
                    <td><i className='bx bx-checkbox' style={{ fontSize: '25px' }}></i></td>
                    <td><i className='bx bx-checkbox' style={{ fontSize: '25px' }}></i></td>

                </tr>
            </tbody>
        </table>


        <table className="table mx-auto border border-info" style={{ maxWidth: '300px' }}>



            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">TO</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Name</th>
                    <td></td>

                </tr>
                <tr>
                    <th scope="row">Pincode</th>
                    <td></td>

                </tr>
                <tr>
                    <th scope="row">Mobile</th>
                    <td></td>

                </tr>
                <tr>
                    <th scope="row">Address</th>
                    <td></td>
                </tr>

            </tbody>
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">From</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Name</th>
                    <td></td>

                </tr>
                <tr>
                    <th scope="row">Pincode</th>
                    <td></td>

                </tr>
                <tr>
                    <th scope="row">Mobile</th>
                    <td></td>

                </tr>
                <tr>
                    <th scope="row">Address</th>
                    <td></td>
                </tr>

            </tbody>
        </table>

    </div>;
};

export default Slip;

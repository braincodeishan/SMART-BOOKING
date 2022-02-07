import React, { useState } from 'react';

const Viewdata = (props) => {
    const [fromName,setfromName]=useState(props.source.from.Name);
    const [fromPin,setfromPin]=useState(props.source.from.Pincode);
    const [fromMobile,setfromMobile]=useState(props.source.from.Mobile);
    const [fromAddress,setfromAddress]=useState(props.source.from.Address);
    const [toName,settoName]=useState(props.source.to.Name);
    const [toPin,settoPin]=useState(props.source.to.Pincode);
    const [toMobile,settoMobile]=useState(props.source.to.Mobile);
    const [toAddress,settoAddress]=useState(props.source.to.Address);
    return <>
        <div className='myViewTable mx-auto'>
                  <table className="table myViewTable"  >
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">From Address</th>

                        


                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Name</th>
                        <td><input type="text" class="form-control" value={fromName} onChange={(e)=>{setfromName(e.target.value)}}/></td>

                        
                      </tr>
                      <tr>
                        <th scope="row">Pincode</th>
                        <td><input type="text" class="form-control" value={fromPin} onChange={(e)=>{setfromPin(e.target.value)}}/></td>

                        
                      </tr>
                      <tr>
                        <th scope="row">Mobile</th>
                        <td><input type="text" class="form-control" value={fromMobile} onChange={(e)=>{setfromMobile(e.target.value)}}/></td>

                        
                      </tr>
                      <tr>
                        <th scope="row">Address</th>
                        <td><textarea id="w3review" name="w3review" rows="4" cols="50" value={fromAddress} onChange={(e)=>{setfromAddress(e.target.value)}}/></td>

                        
                      </tr>
                    </tbody>
                  </table>
                  <table className="table mx-auto " >
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        

                        <th scope="col">To Address</th>


                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Name</th>
                        

                        <td><input type="text" class="form-control" value={toName} onChange={(e)=>{settoName(e.target.value)}}/></td>
                      </tr>
                      <tr>
                        <th scope="row">Pincode</th>
                        

                        <td><input type="text" class="form-control" value={toPin} onChange={(e)=>{settoPin(e.target.value)}}/></td>
                      </tr>
                      <tr>
                        <th scope="row">Mobile</th>
                        

                        <td><input type="text" class="form-control" value={toMobile} onChange={(e)=>{settoMobile(e.target.value)}}/></td>
                      </tr>
                      <tr>
                        <th scope="row">Address</th>
                        

                        <td><textarea id="w3review" name="w3review" rows="4" cols="50" value={toAddress} onChange={(e)=>{settoAddress(e.target.value)}}/></td>
                      </tr>
                    </tbody>
                  </table>
                <div className='mx-auto' style={{maxWidth: '100px'}}>
                  <button type="button" className="btn btn-success mx-auto ml-5">Submit</button>
                  </div>
                </div>
    </>;
};

export default Viewdata;

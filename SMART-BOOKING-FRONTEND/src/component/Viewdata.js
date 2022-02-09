import React, { useState, useEffect } from 'react';
import Alert from './subComponent/Alert';
import Loading from './subComponent/Loading';

const Viewdata = (props) => {
  const [fromName, setfromName] = useState(props.source.from.Name);
  let stringTrim = props.source.from.Pincode.replace(/ /g, "")
  const [fromPin, setfromPin] = useState(stringTrim);
  stringTrim = props.source.from.Mobile.replace(/ /g, "")
  const [fromMobile, setfromMobile] = useState(stringTrim);
  const [fromAddress, setfromAddress] = useState(props.source.from.Address);
  const [toName, settoName] = useState(props.source.to.Name);
  stringTrim = props.source.to.Pincode.replace(/ /g, "")
  const [toPin, settoPin] = useState(stringTrim);
  stringTrim = props.source.to.Mobile.replace(/ /g, "")
  const [toMobile, settoMobile] = useState(stringTrim);
  const [toAddress, settoAddress] = useState('');
  const [doorDelivery, setdoorDelivery] = useState();
  const [otpDelivery, setotpDelivery] = useState();
  const [weight, setweight] = useState(0);
  const [length, setlength] = useState(0);
  const [bredth, setbredth] = useState(0);
  const [height, setheight] = useState(0);
  const [alert, setalert] = useState({ status: 400, message: "" });
  const [isLoading, setisLoading] = useState(false);
  const key = "ms3KbC2EqPpsEMEqUUq6wWUhBdRwzLdLnd8VHM1I81vkgX9RTkwC7S145rZwma0T";
  const url = 'https://data.mongodb-api.com/app/data-azazr/endpoint/data/beta/action/insertOne'

  const saveData = async() => {
    try{
    setisLoading(true);
    // var axios = require('axios');
    var myDate=Date.now()
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("api-key", "ms3KbC2EqPpsEMEqUUq6wWUhBdRwzLdLnd8VHM1I81vkgX9RTkwC7S145rZwma0T");

var raw = JSON.stringify({
  "collection": "bookingdata",
  "database": "test",
  "dataSource": "Cluster0",
  "document": {
    "Barcode": "CA24571242IN",
    "REF": "",
    "Sender_City": "",
    "Sender_Pincode": "fromPin",
    "Sender_Name": "fromName",
    "Sender_ADD1": "fromAddress",
    "Addre_City": "",
    "Addre_Pincode": "toPin",
    "Addre_Name": "toName",
    "Addre_ADD1": "toAddress",
    "ADDREMAIL": "",
    "ADDRMOBILE": "toMobile",
    "SENDERMOBILE": "fromMobile",
    "Weight": "weight",
    "InsVal": "",
    "PrPdAmount": "",
    "PrPdType": "",
    "L": "length",
    "B": "bredth",
    "H": "height",
    "ContentType": "",
    "Date": "myDate"
  }
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://data.mongodb-api.com/app/data-azazr/endpoint/data/beta/action/insertOne", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

    // if (res.status === 200) {
    //   setalert({ status: 200, message: "Data is saved" })
    //   setisLoading(true);
    //   setTimeout(() => {
    //     setalert({ status: 400, message: "" })
    //     setisLoading(false);
    //   }, 2000);
    // } else {
    //   setalert({ status: 400, message: "Something went Wrong" })
    //   setisLoading(true);
    //   setTimeout(() => {
    //     setalert({ status: 400, message: "" })
    //     setisLoading(false);
    //   }, 2000);

    // }
  }catch(err){
    setalert({ status: 400, message: "Fatal ERROR occured" })
      setisLoading(true);
      setTimeout(() => {
        setalert({ status: 400, message: "" })
        setisLoading(false);
      }, 2000);
  }
  }



  const findOffice = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fromPin,
          toPin
        })
      })
      // const result=await res.json();
      if (res.status === 201) {
        let data = props.source.from.Address + ", " + "Vijayawada HO"
        setfromAddress(data)
        data = props.source.to.Address + ", " + "Kurnool B Camp SO"
        settoAddress(data)
      } else {
        setalert({ status: 400, message: "Something went wrong" })
        setTimeout(() => {
          setalert({ status: 400, message: "" })
        }, 2000);
      }
    }
    catch (err) {
      setalert({ status: 400, message: "Something went wrong" + err })
      setTimeout(() => {
        setalert({ status: 400, message: "" })
      }, 2000);
    }

  }

  useEffect(() => {
    findOffice()
  });



  return <>
    {isLoading && <Loading />}
    {
      alert.message !== "" && <Alert alert={alert} />
    }
    <div className='myViewTable mx-auto'>
      <table className="table mx-auto"  >
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
            <td><input type="radio" name='doorDelivery' className='m-2' value="true" onChange={(e) => { setdoorDelivery(e.target.value) }} /></td>
            <td><input type="radio" name='doorDelivery' className='m-2' value="false" onChange={(e) => { setdoorDelivery(e.target.value) }} /></td>
          </tr>
        </tbody>
      </table>
      <table className="table"  >
        <thead>
          <tr>
            <th scope="col">Secure OTP Delivery</th>
            <th scope="col">YES</th>
            <th scope="col">NO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"></th>
            <td><input type="radio" name='otpDelivery' className='m-2' value="true" onChange={(e) => { setotpDelivery(e.target.value) }} /></td>
            <td><input type="radio" name='otpDelivery' className='m-2' value="false" onChange={(e) => { setotpDelivery(e.target.value) }} /></td>
          </tr>
        </tbody>
      </table>
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
            <td><input type="text" className="form-control" value={fromName} onChange={(e) => { setfromName(e.target.value) }} /></td>
          </tr>
          <tr>
            <th scope="row">Pincode</th>
            <td><input type="text" className="form-control" value={fromPin} onChange={(e) => { setfromPin(e.target.value) }} /></td>
          </tr>
          <tr>
            <th scope="row">Mobile</th>
            <td><input type="text" className="form-control" value={fromMobile} onChange={(e) => { setfromMobile(e.target.value) }} /></td>
          </tr>
          <tr>
            <th scope="row">Address</th>
            <td><textarea id="w3review" name="w3review" rows="4" cols="25" value={fromAddress} onChange={(e) => { setfromAddress(e.target.value) }} /></td>
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


            <td><input type="text" className="form-control" value={toName} onChange={(e) => { settoName(e.target.value) }} /></td>
          </tr>
          <tr>
            <th scope="row">Pincode</th>


            <td><input type="text" className="form-control" value={toPin} onChange={(e) => { settoPin(e.target.value) }} /></td>
          </tr>
          <tr>
            <th scope="row">Mobile</th>


            <td><input type="text" className="form-control" value={toMobile} onChange={(e) => { settoMobile(e.target.value) }} /></td>
          </tr>
          <tr>
            <th scope="row">Address</th>


            <td><textarea id="w3review" name="w3review" rows="4" cols="25" value={toAddress} onChange={(e) => { settoAddress(e.target.value) }} /></td>
          </tr>
        </tbody>
      </table>
      <table className="table mx-auto"  >
        <tbody>
          <tr>
            <th scope="row">Weight (gms)</th>
            <td><input type="text" value={weight} className="form-control" onChange={(e) => { setweight(e.target.value) }} /></td>

          </tr>

        </tbody>
      </table>
      <table className="table mx-auto"  >
        <tbody>
          <tr>
            <th scope="row">Volumetric Wt.(LxBxH)</th>
            <td><input type="text" style={{ width: '50px' }} className="form-control" value={length} onChange={(e) => { setlength(e.target.value) }} /></td>
            <td><input type="text" style={{ width: '50px' }} className="form-control" value={bredth} onChange={(e) => { setbredth(e.target.value) }} /></td>
            <td><input type="text" style={{ width: '50px' }} className="form-control" value={height} onChange={(e) => { setheight(e.target.value) }} /></td>

          </tr>

        </tbody>
      </table>



      <div className='mx-auto' style={{ maxWidth: '100px' }}>
        <button type="button" className="btn btn-success mx-auto ml-5" onClick={saveData}>Submit</button>
      </div>
    </div>
  </>;
};

export default Viewdata;

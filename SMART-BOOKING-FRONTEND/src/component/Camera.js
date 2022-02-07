import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import Alert from './subComponent/Alert';
import Loading from './subComponent/Loading'
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "50vh",
    textAlign: 'center',
  },
  imgBox: {
    maxWidth: "80%",
    maxHeight: "80%",
    marginLeft: "10%"
  },
  img: {
    height: "inherit",
    maxWidth: "inherit",
  },
  input: {
    display: "none"
  }
}));


function Camera(props) {
  const classes = useStyles();
  const [encoded, setencoded] = useState("");
  const [mySource, setmySource] = useState("");
  const [alert, setalert] = useState({ status: 400, message: "" });
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  const handleCapture = (target) => {
    setisLoading(true)
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        var reader = new FileReader();
        reader.onloadend = () => {
          const dataOutput = reader.result;
          const data = dataOutput.substr(23)
          setencoded(data);

        }
        reader.readAsDataURL(file);
        const newUrl = URL.createObjectURL(file);
        setmySource(newUrl);
      }
    }
    setisLoading(false)
  };

  const retake = () => {
    setencoded("");
    setmySource("")
    const updatedData = {
      from: {
        Name: "",
        Pincode: "",
        Mobile: "",
        Address: ""
      },
      to: {
        Name: "",
        Pincode: "",
        Mobile: "",
        Address: ""
      }
    }
    props.setSource(updatedData);
  }

  const fetchAPI = async () => {
    setisLoading(true)
    // const key = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA7u3yyCgCScPmfvmgLI0Egdw3i1UtGoA4"
    const key = "https://jsonplaceholder.typicode.com/posts"
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "requests": [
        {
          "image": {
            "content": "encoded"
          },
          "features": [
            {
              "maxResults": 50,
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };


    const res = await fetch(key, requestOptions)
    const result = await res.json();
    // console.log(res)
    console.log(result);
    if (res.status === 201) {
      setalert({ status: 200, message: "Data successfully converted" })
      const datas = "TO\nNAME\nISHAN DEV\nPINCODE\n518 002\nМOBILE\n888 2263 883\nADDRESS\nC-130/507\nPRAKASH NAGAR\nPOSTAL COLONY\nKURNOOL\nFROM\nNAME\nCHINNA BABU\nPINCODE\n514013\nМOBILE\n9494305721\nADDRESS\nIP TECHNOLOGY\nCIRCLE OFFICE\nVIJAYA WADA\n"
      dataModification(datas)
      setTimeout(() => {
        setalert({ status: 400, message: "" })
        setisLoading(false)
        navigate('/View')
      }, 2000);

    } else {
      setalert({ status: 200, message: "Something Went wrong" })
      setTimeout(() => {
        setalert({ status: 400, message: "" })
        setisLoading(false)
      }, 2000);
    }

  }

  const dataModification = (data) => {
    var str = "";
    let toIndex = 0;
    let fromIndex = 0;
    let toDataIndex = { Name: 0, Pin: 0, Mobile: 0, Address: 0 }
    let fromDataIndex = { Name: 0, Pin: 0, Mobile: 0, Address: 0 }
    let myToData = { Name: "", Pin: "", Mobile: "", Address: "" }
    let myFromData = { Name: "", Pin: "", Mobile: "", Address: "" }

    let data1 = data.split(/\r\n|\r|\n/)
    console.log(data1);
    data1.map((val, index) => {
      if (val === "TO") {
        toIndex = index;
      } else if (val === "FROM") {
        fromIndex = index;
      }
    })
    data1.map((val, index) => {
      if (val === 'NAME' && index < fromIndex) {
        toDataIndex.Name = index;
      } else if (val === 'NAME' && index > fromIndex) {
        fromDataIndex.Name = index;
      }
      if (val === 'PINCODE' && index < fromIndex) {
        toDataIndex.Pin = index;
      } else if (val === 'PINCODE' && index > fromIndex) {
        fromDataIndex.Pin = index;
      }
      if ((val === 'МOBILE' || val === 'MOBILE') && index < fromIndex) {
        toDataIndex.Mobile = index;
      } else if ((val === 'МOBILE' || val === 'MOBILE') && index > fromIndex) {
        fromDataIndex.Mobile = index;
      }
      if (val === 'ADDRESS' && index < fromIndex) {
        toDataIndex.Address = index;
      } else if (val === 'ADDRESS' && index > fromIndex) {
        fromDataIndex.Address = index;
      }
    })
    data1.map((val, index) => {
      if (index > toDataIndex.Name && index < toDataIndex.Pin) {//TO name

        myToData.Name = myToData.Name + val + " ";

      } else if (index > toDataIndex.Pin && index < toDataIndex.Mobile) {//TO PIN

        myToData.Pin = myToData.Pin + val + " ";

      } else if (index > toDataIndex.Mobile && index < toDataIndex.Address) {//TO MOBILE

        myToData.Mobile = myToData.Mobile + val + " ";

      } else if (index > toDataIndex.Address && index < fromIndex) { //TO ADDRESS

        myToData.Address = myToData.Address + val + " ";

      } else if (index > fromDataIndex.Name && index < fromDataIndex.Pin) {  //FROM NAME

        myFromData.Name = myFromData.Pin + val + " ";

      } else if (index > fromDataIndex.Pin && index < fromDataIndex.Mobile) {  //FROM PIN

        myFromData.Pin = myFromData.Pin + val + " ";

      } else if (index > fromDataIndex.Mobile && index < fromDataIndex.Address) {  //FROM MOBILE

        myFromData.Mobile = myFromData.Mobile + val + " ";

      } else if (index > fromDataIndex.Address) {  //FROM ADDRESS

        myFromData.Address = myFromData.Address + val + " ";

      }
    })

    console.log("from index" + fromIndex);
    // console.log(toDataIndex);
    console.log(toDataIndex);
    console.log(myToData);
    console.log(fromDataIndex);
    console.log(myFromData);
    const updatedData = {
      from: {
        Name: myFromData.Name,
        Pincode: myFromData.Pin,
        Mobile: myFromData.Mobile,
        Address: myFromData.Address
      },
      to: {
        Name: myToData.Name,
        Pincode: myToData.Pin,
        Mobile: myToData.Mobile,
        Address: myToData.Address
      }
    }
    props.setSource(updatedData);

  }



  return (
    <>
      {isLoading && <Loading />}
      {alert.message !== "" && <Alert alert={alert} />}
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <h5>Capture your image</h5>
            {mySource &&
              <Box display="flex" justifyContent="center" border={1} className={classes.imgBox}>
                <img src={mySource} alt={"snap"} className={classes.img}></img>
              </Box>}
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              capture="environment"
              onChange={(e) => handleCapture(e.target)}
            />
            {!mySource && <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCameraRoundedIcon fontSize="large" color="primary" />
              </IconButton>

            </label>}
            {mySource && <section>
              <div className='d-flex flex-row justify-content-center align-items-center'>
                <div className='d-flex flex-column p-3 m-3 hover-aqua' onClick={retake}>
                  <i className='bx bx-exit bx-rotate-180' ></i>
                  <h3>Retake</h3>
                </div>
                <div className='d-flex flex-column p-3 m-3 hover-aqua' onClick={fetchAPI}>
                  <i className='bx bx-right-arrow-circle'></i>
                  <h3>Next</h3>
                </div>
              </div>
            </section>}
            
          </Grid>
        </Grid>

      </div>
    </>
  );
}
export default Camera;
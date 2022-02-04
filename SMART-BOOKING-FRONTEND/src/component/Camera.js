import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import Alert from './subComponent/Alert';
import Loading from './subComponent/Loading'

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
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
  const [alert, setalert] = useState({ status: 400, message: "" });
  const [isLoading, setisLoading] = useState(false);

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
        props.setSource(newUrl);
      }
    }
    setisLoading(false)
  };
  const retake = () => {
    setencoded("");
    props.setSource("");
  }

  const fetchAPI = async () => {
    setisLoading(true)
    // const key = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA7u3yyCgCScPmfvmgLI0Egdw3i1UtGoA4"
    const key = "http://localhost:3001/contact"
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
    console.log(res)
    console.log(result);
    if (res.status === 200) {
      setalert({ status: 200, message: "Data successfully converted" })
      setTimeout(() => {
        setalert({ status: 400, message: "" })
        setisLoading(false)

      }, 2000);



    } else {
      setalert({ status: 200, message: "Something Went wrong" })
      setTimeout(() => {
        setalert({ status: 400, message: "" })
        setisLoading(false)
      }, 2000);


    }

  }





  return (
    <>
      {isLoading && <Loading />}
      {alert.message !== "" && <Alert alert={alert} />}
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <h5>Capture your image</h5>
            {props.source &&
              <Box display="flex" justifyContent="center" border={1} className={classes.imgBox}>
                <img src={props.source} alt={"snap"} className={classes.img}></img>
              </Box>}
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              capture="environment"
              onChange={(e) => handleCapture(e.target)}
            />
            {!props.source && <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCameraRoundedIcon fontSize="large" color="primary" />
              </IconButton>

            </label>}
            {props.source && <section>
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
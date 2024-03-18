
import './App.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from './Footer';


const Bookmark = () => {
    const { houseid } = useParams();
    const [houseData, setHouseData] = useState(null);
//    const [img, setImg] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('');
    

    let params = useParams();
    console.log("params", params);
  
    const handleClick = async () => {
      const Data = {
        token: localStorage.getItem('token'),
        houseid: houseid,
      };

      const response = await fetch('/node/savepropery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Data),

      });
      console.log("response", response);

      if (response.ok) {
        setAlertColor('alert alert-success');
        setShowAlert(true);
        setAlertMessage('Successful saved property.');
      } else {
        setShowAlert(true);
        setAlertColor('alert alert-danger');
        setAlertMessage('Bookmark already exists.');
      }

      
      
    };



    useEffect(() => {

        // Fetch house details and images by houseid
        fetch(`/node/geteachhouse/${houseid}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("data", data);
            console.log("data.house", data.house);
            console.log("data.house.images", data.house.images);

            setHouseData(data.house);
          })
          .catch((error) => {
            console.error('Error fetching house details:', error);
          });
      }, [houseid]);

      console.log("houseData", houseData);

/*      for(var i = 0; houseData.images.length; i++){
        console.log("houseData.images", houseData.images);
      }*/
    
      if (!houseData) {
        return <div>Loading...</div>;
      }

    return (

        <>

        <div class="container">
          <div class="row" id="rowone">
            <div class="col-3	col-sm-3	col-md-3	col-lg-3	col-xl-3">

            </div>
            <div class="col">
            {showAlert && (
            <div className={alertColor} role="alert">
              {alertMessage}
            </div>)}

            <br></br>
            <h4 id="each-listing-title">{houseData?.househeading}</h4><br></br>
            <div clas="row">
              <Carousel useKeyboardArrows={true}>
                {houseData?.images.map((image, index) => (
                <div className="slide">
                  <img alt="sample_file" src={image?.houseimageimageurl} key={index} />
                  </div>
                ))}
                </Carousel>

                
              </div>
              
              <div class="eachlisting-row-2">
                <p class="each-listing-attribute"><b>Description: </b>{houseData?.housedescription}</p>
                <p class="each-listing-attribute"><b>Price: </b>{houseData?.houseprice}</p>
                <p class="each-listing-attribute"><b>Bedrooms: </b>{houseData?.housebedroom}</p>
                <p class="each-listing-attribute"><b>Bathrooms: </b>{houseData?.housebathroom}</p>
                <p class="each-listing-attribute"><b>Area Unit: </b>{houseData?.houseareaunit}</p>
                <p class="each-listing-attribute"><b>Street Name: </b>{houseData?.housestreetname}</p>
                <p class="each-listing-attribute"><b>Creation Date: </b>{houseData?.housecreatedate}</p>
              </div>

            </div>
            <div class="col-3	col-sm-3	col-md-3	col-lg-3	col-xl-3">

              <div class="row" id="col-3-row-1">
                <div class="col">

                </div>
                <div class="col">


                </div>
                <div class="col">

                </div>
                
              </div>


            </div>
          </div>
        </div>
        <Footer/>
        
        
        </>
    );
}

export default Bookmark;

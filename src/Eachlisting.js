
import './App.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import axios from 'axios';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Eachlisting = () => {
    const { houseid } = useParams();
//    const [houseData, setHouseData] = useState();
    const [sdata, setData] = useState();
  //  const [simages, setImages] = useState();
  //  const [img, setImg] = useState();
    const [imageURL, setImageURL] = useState('');
    
//    const stringx = 'https://unsplash.com/photos/Ete0zMKPWys';
  //  let houseData;

    let params = useParams();
    console.log("params", params);
    console.log("params", params.houseid);
  //  const reader = new FileReader();


//    const yyy = 'C:\\Users\\USER\\react-school\\project-backend\\images\\1cd592cf6d2e14bd5273a4d1d7aa3138';
//    const data22 =  yyy.blob();


   
//    const xxxx = reader.readAsDataURL(new File([data22], yyy));
//    xxx();    

    useEffect(() => {
      const getImageURL = async () => {
        try {
          console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
          const response = await axios.get('http://localhost:8000/node/get-image-url');
          console.log("response.data.image", response.data.image);
          setImageURL(response?.data.image);
          console.log("imageURL", imageURL);
        } catch (error) {
          console.error('Error fetching image URL:', error);
        }
      };
  
      getImageURL();
    }, []);


    useEffect(() => {

        // Fetch house details and images by houseid
        fetch(`/node/geteachhouse/${houseid}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("data", data);
            console.log("data.house", data.house);
            console.log("data.house.images", data.house.images);
            setData(data.house);

//            houseData = data.house;
            console.log("sData", sdata);



          })
          .catch((error) => {
            console.error('Error fetching house details:', error);
          });
      }, [houseid]);

      console.log("sdata", sdata);
      console.log("sdata.househeading", sdata?.househeading);

/*      for(var i = 0; houseData.images.length; i++){
        console.log("houseData.images", houseData.images);
      }*/
    
      if (!sdata) {
        return <div>Loading...</div>;
      }

    return (

        <>
        <div class="container">
          <div class="row" id="rowone">
            <div class="col-3">

            </div>
            <div class="col">

            <br></br>
            <h4 id="each-listing-title">{sdata?.househeading}</h4><br></br>
            <div clas="row">
              <Carousel useKeyboardArrows={true}>
                {sdata?.images.map((image, index) => (
                <div className="slide">
                  <img alt="sample_file" src={image?.houseimageimageurl} key={index} />
                  </div>
                ))}
                </Carousel>


              </div>
              
              <div class="eachlisting-row-2">
                <p class="each-listing-attribute"><b>Description: </b>{sdata?.housedescription}</p>
                <p class="each-listing-attribute"><b>Price: </b>{sdata?.houseprice}</p>
                <p class="each-listing-attribute"><b>Bedrooms: </b>{sdata?.housebedroom}</p>
                <p class="each-listing-attribute"><b>Bathrooms: </b>{sdata?.housebathroom}</p>
                <p class="each-listing-attribute"><b>Area Unit: </b>{sdata?.houseareaunit}</p>
                <p class="each-listing-attribute"><b>Street Name: </b>{sdata?.housestreetname}</p>
                <p class="each-listing-attribute"><b>Creation Date: </b>{sdata?.housecreatedate}</p>
              </div>

            </div>
            <div class="col-3">

            </div>
          </div>
        </div><Footer />

</>
    );
}

export default Eachlisting;
/*
            <div>
                {sdata?.images.map((image) => (
                 
                    <img
                        key={image.houseimageid}
                        src={URL.createObjectURL(new Blob([Buffer.from(image.houseimageblob)], { type: 'image/jpeg' }))}
                        alt={image.houseimageoriginalname}
                        style={{ width: '200px', height: '150px', margin: '10px' }} />
                ))}
            </div>
 */

            /*
            
                  {sdata?.images.map((image) => (
                  
                      <img
                          key={image?.houseimageid}
                          src={image?.houseimageimageurl}
                          alt={image?.houseimageoriginalname}
                          style={{ width: '200px', height: '150px', margin: '10px' }} />
                  ))}
            */
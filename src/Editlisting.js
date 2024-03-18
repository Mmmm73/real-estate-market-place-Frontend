
import './App.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Footer from './Footer';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Editlisting = () => {
  const navigate = useNavigate();
    let [selectedOption1, setSelectedOption1] = useState('');
    let [selectedOption2, setSelectedOption2] = useState('');
    const { houseid } = useParams();
    let [houseData, setHouseData] = useState(null);
    let [surburb, setSurburb] = useState('');
    let [description, setDescription] = useState('');
    let [price, setPrice] = useState('');
    let [bedroom, setBedroom] = useState('');
    let [bathroom, setBathroom] = useState('');
    let [areaunit, setAreaunit] = useState('');
    let [streetname, setStreetname] = useState('');
    let [heading, setHeading] = useState('');
    let [alertMessage, setAlertMessage] = useState('');
    let [showAlert, setShowAlert] = useState(false);
    let [selectedPhotos, setSelectedPhotos] = useState([]);
    var dataVar;

    let params = useParams();
    console.log("params", params);


    useEffect(() => {

        // Fetch house details and images by houseid
        fetch(`/node/geteachhouse/${houseid}`)
          .then((response) => response.json())
          .then((data) => {
            console.log("data", data);
            console.log("data.house", data.house);
            console.log("data.house.images", data.house.images);
            dataVar = data.house;
            console.log("dataVar:", dataVar);
            console.log("dataVar:", dataVar.housesurburb);

            setHouseData(data.house);
          })
          .catch((error) => {
            console.error('Error fetching house details:', error);
          });
      }, [houseid]);

      console.log("houseData", houseData);

      const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform form submission logic

//        console.log("xxxxx 11", selectedOption1, selectedOption2, selectedOption3, surburb, streetname, heading, description, price, bedroom, bathroom, areaunit);
        console.log("xxxxx 11", selectedOption1);
        console.log("xxxxx 22",  selectedOption2);

        if(selectedOption1 === ""){
          selectedOption1 = houseData?.houselistingtype;
          console.log("selectedOption1 is null");
        }
        if(selectedOption2 === ""){
          selectedOption2 = houseData?.housepropertytype;
          console.log("selectedOption2 is null");
        }

        if(surburb === ""){
          surburb = houseData?.housesurburb;
          console.log("surburb is null");
        }

        if(streetname === ""){
          streetname = houseData?.streetname;
          console.log("streetname is null");
        }

        if(heading === ""){
          heading = houseData?.heading;
          console.log("heading is null");
        }

        if(description === ""){
          description = houseData?.description;
          console.log("description is null");
        }

        if(price === ""){
          price = houseData?.houseprice;
          console.log("price is null");
        }
        if(bathroom === ""){
          bathroom = houseData?.housebathroom;
          console.log("bathroom is null");
        }

        if(areaunit === ""){
          areaunit = houseData?.houseareaunit;
          console.log("areaunit is null");
        }

        if(bedroom === ""){
          bedroom = houseData?.housebedroom;
          console.log("bedroom is null");
        }
        console.log("areaunit", areaunit);

        
        const formData = new FormData();
        formData.append('houseid', houseid);
        formData.append('listingtype', selectedOption1);
        formData.append('propertytype', selectedOption2);
        formData.append('surburb', surburb);
        formData.append('streetname', streetname);
        formData.append('heading', heading);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('bedroom', bedroom);
        formData.append('bathroom', bathroom);
        formData.append('areaunit', areaunit);

        selectedPhotos.forEach((photo, index) => {
          formData.append(`photos`, photo);
        });

        try {
          const response = await axios.post('/node/updatelisting', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Response from server:', response.data);
          
          if(response.status){
            navigate('/mylisting');
          }
        } catch (error) {
          console.error('Error inserting housing data and images:', error);
      }
          
        
    
         
    };
    
      if (!houseData) {
        return <div>Loading...</div>;
      }

      
    const handleFileChange = (event) => {
      const files = event.target.files;
      console.log("files", files)
        console.log("xxxxx 2",selectedOption1, selectedOption2, surburb, streetname, heading, description, price, bedroom, bathroom, areaunit);
        // Check if the total number of selected photos doesn't exceed 5
        if (files.length + selectedPhotos.length <= 5) {
          
          const selectedImages = Array.from(files);
          console.log("selectedImages", selectedImages);
          setSelectedPhotos((prevPhotos) => [...prevPhotos, ...selectedImages]);

        } else {
          // Display a message or perform an action when more than 5 photos are selected
          console.log('You can select a maximum of 5 photos.');
        }


      };

      const handleRemovePhoto = (index) => {
        setSelectedPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
      };

      const handleOptionChange1 = (event) => {
        setSelectedOption1(event.target.value);
    };
    
    const handleOptionChange2 = (event) => {
        setSelectedOption2(event.target.value);
    };

    return (
      <><div class="container">
      <div class="row" id="rowone">
        <div class="col">

        </div>
        <div class="col">
          {showAlert && (
            <div className="alert alert-danger" role="alert">{alertMessage}</div>
          )}

          <h4 id="create-listing-title">Edit listing</h4><br /><br />

          <form onSubmit={handleSubmit}>
            <label class="create-listing-label">Listing type:</label><br />
            <select class="form-select" aria-label="Default select example" defaultValue={houseData?.houselistingtype} onChange={handleOptionChange1}>
              <option selected>Choose...</option>
              <option value="Sale">Sale</option>
              <option value="Rent">Rent</option>
            </select><br />

            <label class="create-listing-label">Propert type:</label>
            <select class="form-select" aria-label="Default select example" defaultValue={houseData?.housepropertytype} onChange={handleOptionChange2}>
              <option selected>Choose...</option>
              <option value="House">House</option>
              <option value="Apartments">Apartments</option>
              <option value="Townhouses">Townhouses</option>
              <option value="Villas">Villas</option>
              <option value="Office">Office</option>
            </select><br />

            <label class="create-listing-label">Surburb:</label><br></br>
            <input id="surburb" class="form-control" name="surburb" type="text" placeholder="Surburb"  defaultValue={houseData?.housesurburb} onChange={event => setSurburb(event.target.value)}/><br />

            <label class="create-listing-label">Street Name:</label><br></br>
            <input id="streetname" class="form-control" name="streetname" type="text" placeholder="Street name" defaultValue={houseData?.housestreetname} onChange={event => setStreetname(event.target.value)}/><br />

            <label class="create-listing-label">Heading:</label><br></br>
            <input id="heading" class="form-control" name="heading" type="text" placeholder="Heading" defaultValue={houseData?.househeading} onChange={event => setHeading(event.target.value)}/><br />

            <div class="form-group">
              <label class="create-listing-label">Description:</label><br></br>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" defaultValue={houseData?.housedescription} onChange={event => setDescription(event.target.value)}></textarea>
            </div><br />

            <div class="row">
              <div class="col">
                <label class="create-listing-label">Price:</label><br></br>
                <input id="price" class="form-control" name="price" type="text" placeholder="Price"  defaultValue={houseData?.houseprice} onChange={event => setPrice(event.target.value)}/><br />

                <label class="create-listing-label">Bathrooms:</label><br></br>
                <input id="bathroom" class="form-control" name="bathroom" type="text" placeholder="Bathroom"  defaultValue={houseData?.housebathroom} onChange={event => setBathroom(event.target.value)}/><br />

              </div>
              <div class="col">
                <label class="create-listing-label">Area:</label>
                <input id="areaunit" class="form-control" name="areaunit" type="text" placeholder="Area Unit" defaultValue={houseData?.houseareaunit}  onChange={event => setAreaunit(event.target.value)}/><br />

                <label class="create-listing-label">Bedrooms:</label>
                <input id="bedroom" class="form-control" name="bedroom" type="text" placeholder="Bedroom" defaultValue={houseData?.housebedroom} onChange={event => setBedroom(event.target.value)}/><br />
              </div>

            </div>

            <div class="form-group">
              <label class="create-listing-label-two">Select Photos:</label><br></br><br />
              <input type="file" class="form-control-file" id="select-photos-button" name="photos" accept="image/*" multiple onChange={handleFileChange}></input>
            </div>

            <div>
              <br /><br />
              <h4>Selected Photos:</h4><br />
              {selectedPhotos.map((file, index) => (
                <div key={index} name="photos">

                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected ${index + 1}`}
                    width="100"
                    height="100" />
                  <Button id="remove-image" onClick={() => handleRemovePhoto(index)}>Remove</Button>
                </div>
              ))}
            </div>

            <br />
            <br />
            <button type="submit" class="btn btn-primary" id="home-submit-button">Edit Listing</button>  <br /><br />

          </form>
        </div>
        <div class="col">

        </div>
      </div>

    </div><Footer /></>
    );
}

export default Editlisting;


/*
        <><div>
            <p>sdrtfygukhi</p>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a >Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Library</li>
            </ol>
        </div>
        <div>
        <form onSubmit={handleSubmit}>
            <img src={stringx} alt="Mountain" ></img> 
            
            <label>Listing type:</label>
            <select class="form-select" aria-label="Default select example" value={houseData.houselistingtype} >
                <option selected>Choose...</option>
                <option value="Sale">Sale</option>
                <option value="Rent">Rent</option>
            </select>
            <br/> 
            
            <label>Propert type:</label>
            <select class="form-select" aria-label="Default select example" value={houseData.housepropertytype} >
                <option selected>Choose...</option>
                <option value="House">House</option>
                <option value="Apartments">Apartments</option>
                <option value="Townhouses">Townhouses</option>
                <option value="Villas">Villas</option>
                <option value="Office">Office</option>
            </select>
                
            <br/> 

            <label>Surburb</label>
            <input
            id="surburb"
            name="surburb"
            type="text"
            placeholder="Surburb"
            value={dataVar?.housesurburb}
            onChange={event => setSurburb(event.target.value)} 
            isInvalid={event =>  !event.target.value.trim()}
            />
            <br />

            <label>Street Name</label>
        <input
            id="streetname"
            name="streetname"
            type="text"
            placeholder="Street name"
            value={houseData.housestreetname}
            onChange={event => setStreetname(event.target.value)} />
          <br />

        <label>Heading</label>
        <input
            id="heading"
            name="heading"
            type="text"
            placeholder="Heading"
            value={houseData.househeading}
            onChange={event => setHeading(event.target.value)} />
          <br />

        <label>Description</label>
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Example textarea</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={houseData.housedescription} onChange={event => setDescription(event.target.value)}></textarea>
        </div><br />

        <label>Price</label>
        <input
            id="price"
            name="price"
            type="text"
            placeholder="Price"
            value={houseData.houseprice}
            onChange={event => setPrice(event.target.value)} />
          <br />

        <label>Bedrooms</label>
        <input
            id="bedroom"
            name="bedroom"
            type="text"
            placeholder="Bedroom"
            value={houseData.housebedroom}
            onChange={event => setBedroom(event.target.value)} />
          <br />

        <label>Bathrooms</label>
        <input
            id="bathroom"
            name="bathroom"
            type="text"
            placeholder="Bathroom"
            value={houseData.housebathroom}
            onChange={event => setBathroom(event.target.value)} />
          <br />


        
        <label>Area Unit</label>
        <input
            id="areaunit"
            name="areaunit"
            type="text"
            placeholder="Area Unit"
            value={houseData.houseareaunit}
            onChange={event => setAreaunit(event.target.value)} />
          <br />
          <button id="home-submit-button" type="submit" >Add Listing</button>
       </form>

        </div></>
*/
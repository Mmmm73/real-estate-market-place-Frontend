import './App.css';
import React from 'react';
import {useState} from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Footer from './Footer';

function Createlisting() {
    const navigate = useNavigate();
    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [surburb, setSurburb] = useState('');
    const [streetname, setStreetname] = useState('');
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [bedroom, setBedroom] = useState('');
    const [bathroom, setBathroom] = useState('');
    const [areaunit, setAreaunit] = useState('');
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    
    const handleOptionChange1 = (event) => {
        setSelectedOption1(event.target.value);
    };
    
    const handleOptionChange2 = (event) => {
        setSelectedOption2(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform form submission logic

        console.log("xxxxx 1", selectedOption1, selectedOption2, surburb, streetname, heading, description, price, bedroom, bathroom, areaunit);


        if (!selectedOption1 || !selectedOption2 ||  !surburb || !streetname || !heading || !description || !price || !bedroom || !bathroom || !areaunit) {
          setShowAlert(true);
          setAlertMessage('Error. Fill in all the fields.');
          return;
        }

        const formData = new FormData();
        console.log("formData 111", formData);
        formData.append('jwt', localStorage.getItem('token'));
        formData.append('listingtype', selectedOption1);
        console.log("formData selectedOption1", formData.get("listingtype"));
        formData.append('propertytype', selectedOption2);
        console.log("formData.get(propertytype", formData.get("propertytype"));
        formData.append('surburb', surburb);
        console.log("formData.get(surburb)", formData.get("surburb"));
        formData.append('streetname', streetname);
        formData.append('heading', heading);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('bedroom', bedroom);
        formData.append('bathroom', bathroom);
        formData.append('areaunit', areaunit);

/*        console.log("xxxxx09-309-94-3094-2349-390", xxx);
        let signInData = {
          jwt: localStorage.getItem('token'),
          daturl: {},
        };*/

        selectedPhotos.forEach((photo, index) => {
          formData.append(`photos`, photo);
/*          console.log("photo:", photo);
          console.log("photo.name:", photo.name);
          const reader = new FileReader();
          reader.readAsDataURL(photo);*/

          // FileReader will emit the load event when the data URL is ready
          // Access the string using result property inside the callback function
/*          reader.addEventListener('load', () => {
              // Get the data URL string
              console.log(reader.result);
              photo.dataurl = reader.result;
              xxx = JSON.stringify(reader.result);
              console.log("xxx111 ", xxx);
              photo.dataurl = reader.result;
              var xxx222 = reader.result.replace('data:', '').replace(/^.+,/, '');
              signInData.listingtype = xxx222;
              console.log("xxx222", xxx222);
              previews.push(xxx222);
              console.log("previews ", previews.length);
              console.log("previews ", previews[0]);

              var x = document.createElement("IMG");
              x.setAttribute("src",  JSON.parse(JSON.stringify(xxx222)));
              document.body.appendChild(x);
              
          });
          console.log("readre.result", reader.result);*/
        });

//        console.log("xxxxx09-309-94-3094-2349-390", xxx);

//        formData.append(`photos`, previews);
                
        console.log("xxxxx 222", selectedOption1, selectedOption2, surburb, streetname, heading, description, price, bedroom, bathroom, areaunit);
        console.log("formData", formData);

        try {
//          console.log("xxxxx  333", xxx);
          // Send the form data to the Node.js backend using an HTTP POST request
          const response = await axios.post('/node/createlisting', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          // Handle the response from the server, if needed

          console.log('Response from server:', response.data);

          if(response.data.message === 'Housing data and images inserted successfully'){
//            console.log('Response from server xxxxxxxxxxxxxxxx:');
            navigate('/mylisting');
          }

        } catch (error) {
          // Handle any errors that occur during the API call
          console.error('Error inserting housing data and images:', error);
        }

        
    };

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


      

  return (
    <><div class="container">
      <div class="row" id="rowone">
        <div class="col">

        </div>
        <div class="col">
          {showAlert && (
            <div className="alert alert-danger" role="alert">{alertMessage}</div>
          )}

          <h4 id="create-listing-title">Create listing</h4><br /><br />

          <form onSubmit={handleSubmit}>
            <label class="create-listing-label">Listing type:</label><br />
            <select class="form-select" aria-label="Default select example" value={selectedOption1} onChange={handleOptionChange1}>
              <option selected>Choose...</option>
              <option value="Sale">Sale</option>
              <option value="Rent">Rent</option>
            </select><br />

            <label class="create-listing-label">Propert type:</label>
            <select class="form-select" aria-label="Default select example" value={selectedOption2} onChange={handleOptionChange2}>
              <option selected>Choose...</option>
              <option value="House">House</option>
              <option value="Apartments">Apartments</option>
              <option value="Townhouses">Townhouses</option>
              <option value="Villas">Villas</option>
              <option value="Office">Office</option>
            </select><br />

            <label class="create-listing-label">Surburb:</label><br></br>
            <input id="surburb" class="form-control" name="surburb" type="text" placeholder="Surburb" onChange={event => setSurburb(event.target.value)} isInvalid={event => !event.target.value.trim()} /><br />

            <label class="create-listing-label">Street Name:</label><br></br>
            <input id="streetname" class="form-control" name="streetname" type="text" placeholder="Street name" onChange={event => setStreetname(event.target.value)} /><br />

            <label class="create-listing-label">Heading:</label><br></br>
            <input id="heading" class="form-control" name="heading" type="text" placeholder="Heading" onChange={event => setHeading(event.target.value)} /><br />

            <div class="form-group">
              <label class="create-listing-label">Description:</label><br></br>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={event => setDescription(event.target.value)}></textarea>
            </div><br />

            <div class="row">
              <div class="col">
                <label class="create-listing-label">Price:</label><br></br>
                <input id="price" class="form-control" name="price" type="text" placeholder="Price" onChange={event => setPrice(event.target.value)} /><br />

                <label class="create-listing-label">Bathrooms:</label><br></br>
                <input id="bathroom" class="form-control" name="bathroom" type="text" placeholder="Bathroom" onChange={event => setBathroom(event.target.value)} /><br />

              </div>
              <div class="col">
                <label class="create-listing-label">Area:</label>
                <input id="areaunit" class="form-control" name="areaunit" type="text" placeholder="Area Unit" onChange={event => setAreaunit(event.target.value)} /><br />

                <label class="create-listing-label">Bedrooms:</label>
                <input id="bedroom" class="form-control" name="bedroom" type="text" placeholder="Bedroom" onChange={event => setBedroom(event.target.value)} /><br />
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
            <button type="submit" class="btn btn-primary" id="home-submit-button">Add Listing</button>  <br /><br />

          </form>
        </div>
        <div class="col">

        </div>
      </div>

    </div><Footer /></>
  );
}

export default Createlisting;

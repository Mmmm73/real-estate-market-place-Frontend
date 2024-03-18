import './App.css';
import {useNavigate} from 'react-router-dom';
import React, { useEffect } from 'react';
import {useState} from 'react';
import Footer from './Footer';

function Mylisting() {
   
    let data;
    const [datahouse, setDatahouse] = useState(null);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };
     
    const token = localStorage.getItem('token');
    console.log("xxxxxxxxx logged in  33", token);

    const tokenData = {
        jwttoken: token,
    };

    const getHouses = async () =>  {

        console.log("xxxxxxxxxxxxx56756757575");
        try {
            const response = await fetch('/node/gethouses', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(tokenData),
      
            });

            data = await response.json();
            console.log('Response from server:', data);
            console.log('Response from server houses:', data.houses);
            setDatahouse(data.houses);

            for (let i = 0; i < data.houses.length; i++) {
              console.log("data.houses[i].housecreatedate", data.houses[i].housecreatedate);
              const date = new Date(data.houses[i].housecreatedate);
              const humanReadableDate = date.toLocaleString('en-US', options);
              data.houses[i].housecreatedate = humanReadableDate;
              console.log("humanReadableDate", humanReadableDate);
            }


          } catch (error) {
            // Handle any errors that occur during the API call
            console.error('Error inserting housing data and images:', error);
          }

          
    }

    const handleDelete = async (houseid) => {
      try {
        // Make a DELETE request to the Node.js API endpoint passing the ID
        const response = await fetch(`/node/deletehouse/${houseid}`, {
          method: 'DELETE',
        });

        console.log("response", response);
  
        // Handle the response from the server
        if (response.ok) {
          getHouses();
          console.log('Entry deleted successfully');
        } else {
          console.error('Failed to delete entry');
        }
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    };


    useEffect(() => {
        getHouses(); // Call the function only once when the component is mounted
      }, []);


    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/createlisting');
    };

    const handleEachRowClick = (houseid) => {
      navigate('/eachlisting/'+houseid);
    };

    const handleEdit = (houseid) => {
      navigate('/editlisting/'+houseid);
    };

     
    return (
      <><div class="container">
        <div class="row" id="rowone">
          <div class="col-1	col-sm-1	col-md-1	col-lg-1	col-xl-1">


          </div>
          <div class="col">
            <h4 id="my-listing-title">My listings</h4><br /><br />

            <button onClick={handleClick}  id="add-listing-button"class="btn btn-primary">Add listing</button>   
          
              {datahouse?.length > 0? (<>
                <table class="table table-hover" id="my-listing-table">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Heading</th>
                      <th scope="col">Listing</th>
                      <th scope="col">Property</th>
                      <th scope="col">Date</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                {datahouse?.map((itemx, index) => (


                    <tr class="table-tr" key={itemx.houseid}>
                      <td>{index + 1}</td>
                      <td onClick={() => handleEachRowClick(itemx.houseid)}>{itemx.househeading}</td>
                      <td onClick={() => handleEachRowClick(itemx.houseid)}>{itemx.houselistingtype}</td>
                      <td onClick={() => handleEachRowClick(itemx.houseid)}>{itemx.housepropertytype}</td>
                      <td onClick={() => handleEachRowClick(itemx.houseid)}>{itemx.housecreatedate}</td>
                      <td><button onClick={() => handleEdit(itemx.houseid)} id="mylist-edit-Button" class="btn btn-primary">Edit</button></td>
                      <td><button onClick={() => handleDelete(itemx.houseid)} id="mylist-delete-Button" class="btn btn-primary">Delete</button></td>
                    </tr>

                ))}                  </tbody>
                </table></>
              ) : (<><br /><br /><br /><br /><h4>You have no Listings!</h4><br /><br /><br /><br /><br />     </>)}

          </div>
          <div class="col-1	col-sm-1	col-md-1	col-lg-1	col-xl-1">

          </div>
        </div>
      </div><Footer />
</>

        
        );
}

export default Mylisting;

import React, { useEffect } from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';


function Bookmarks() {
    let data;
    const navigate = useNavigate();
    const [bookmarks, setBookmarks] = useState(null);
  
        
    const token = localStorage.getItem('token');
    console.log("xxxxxxxxx logged in  33", token);

    const tokenData = {
        jwttoken: token,
    };

    const getBookmarks = async () =>  {

        console.log("xxxxxxxxxxxxx56756757575");
        try {
            const response = await fetch('/node/getbookmarks', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(tokenData),
      
            });

            data = await response.json();
            console.log("data", data); 

            setBookmarks(data);
            console.log("data.bookmarks", data.bookmarks); 


          } catch (error) {
            // Handle any errors that occur during the API call
            console.error('Error inserting housing data and images:', error);
          }

          
    }

    const handleEachRowClick = (houseid) => {
      navigate('/bookmark/'+houseid);
    };

    useEffect(() => {
      console.log("LOOOOOOOL");
      getBookmarks(); // Call the function only once when the component is mounted
    }, []);

        const handleDelete = async (houseid) => {
           console.log("houseidhouseidhouseid", houseid);
          const deleteData = {
            token: localStorage.getItem('token'),
            houseid: houseid,
          };
          
          try {
            const response = await fetch('/node/deletebookmark/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(deleteData),
      
            });
            const data = await response.json();

            
            if (response.ok) {
              getBookmarks();
            } 
          } catch (error) {
            console.log('An error occurred while processing the request');
          }
        };




  return (

    <div class="container">
            <div class="row" id="properties-row-two">
        <div class="col-1 col-sm-1	col-md-1	col-lg-3 col-xl-3">
        </div>

        <div class="col">
        
          <br></br>
          <h4 id="property-title">Bookmarks</h4>

          <br></br><br></br>

          <table class="table table-hover">
                <thead>
                    <tr>

                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

          {bookmarks?.length > 0 ? (<>
                          {bookmarks?.map((itemx, index) => (
                            
                            <tr key={itemx?.houseid}>


                            <td><img class="card-img-top" id="properties-image-one" src={itemx?.images[0]?.houseimageimageurl} alt="Card image cap" onClick={() => handleEachRowClick(itemx?.houseid)} ></img></td>
                            <td id="properties-table-entry"><br/><span id="properties-heading"><b>{itemx?.househeading}</b></span><br/><br/><span id="properties-price" onClick={() => handleEachRowClick(itemx?.houseid)}>Ksh. {itemx?.houseprice}<br/></span><br/><span><button class="btn btn-primary  btn-block" type="submit" id="bookmark-btn-one" onClick={() => handleDelete(itemx?.houseid)}>Delete</button></span></td>
                            

                            </tr>
                            ))}</>
          ) : (<><h4 id="properties-title-no-results">No Bookmarks found.</h4><br/><br/><br/><br/><br/><br/><br/><br/></> )}
                </tbody>
                </table>

        </div>

        <div class="col-1 col-sm-1	col-md-1	col-lg-3 col-xl-3">
        </div>

      </div>

    </div>
  );
}

export default Bookmarks
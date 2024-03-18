import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Footer from './Footer';

function Properties() {
  let data;
    let [searchparams]  = useSearchParams();
    let [houselistingtypetwo, setHouselistingtype] = useState();
    let[housepropertytypetwo, setHousePropertytype] = useState();
    let [housesurburbtwo, setHousesurburb] = useState();
    let [maxpricetwo, setMaxprice] = useState();
    console.log("searchparams.get(id)", searchparams.get("houselistingtype"));
    console.log("searchparams.get(id)", searchparams.get("housepropertytype"));
    console.log("searchparams.get(id)", searchparams.get("housesurburb"));
    console.log("searchparams.get(id)", searchparams.get("maxprice"));
//    const [houses, setHouses] = useState([]);
    const [datahouse, setDatahouse] = useState(null);

    let houselistingtype = searchparams.get("houselistingtype");
    let housepropertytype = searchparams.get("housepropertytype");
    let housesurburb =searchparams.get("housesurburb");
    let maxprice = searchparams.get("maxprice");

    useEffect(() => {
      // Fetch houses with empty search criteria on initial load
      handleSearch();
    }, []);

    const handleSearch = async () => {

      console.log("iuytrt890876rutiyopouyteryuiopouytreuyruiopouytury");

      const searchCriteria = {
        houselistingtype: houselistingtype,
        housepropertytype: housepropertytype,
        housesurburb: housesurburb,
        houseprice: maxprice,
      };
      console.log("9308492830482390802348092");
      console.log("searchCriteria", searchCriteria);
      try {

            // Make the API request to search for houses
      const response = await fetch('/node/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchCriteria),
      });
      
      data = await response.json();
      console.log('Response from server:', data);
      console.log('Response from server houses:', data.houses);
      setDatahouse(data.houses);



    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error inserting housing data and images:', error);
    }

    };
    const navigate = useNavigate();

    const handleEachRowClick = (houseid) => {
      navigate('/property/'+houseid);
    };

    const handleSearchLocal = (event) =>{
      event.preventDefault();
      console.log(event.target.houselistingtype.value);
      houselistingtype = event.target.houselistingtype.value;

      console.log(event.target.housepropertytype.value);
      housepropertytype = event.target.housepropertytype.value;
      console.log(event.target.housesurburb.value);
      housesurburb = event.target.housesurburb.value;
      console.log(event.target.maxprice.value);
      maxprice = event.target.maxprice.value;

      console.log("houselistingtype", houselistingtype);
      console.log("housepropertytype", housepropertytype);
      console.log("housesurburb", housesurburb);
      console.log("maxprice", maxprice);

      console.log("houselistingtypetwo", houselistingtypetwo);
      if(houselistingtypetwo != null){
        console.log("Not null");
        houselistingtype = houselistingtypetwo;
      }
      console.log("houselistingtype 2", houselistingtype);

      if(housepropertytypetwo != null){
        console.log("Not null");
        housepropertytype = housepropertytypetwo;
      }
      console.log("housepropertytype 2", housepropertytype);

      if(housesurburbtwo != null){
        console.log("Not null");
        housesurburb = housesurburbtwo;
      }
      console.log("housesurburb 2", housesurburb);

      if(maxpricetwo != null){
        console.log("Not null");
        maxprice = maxpricetwo;
      }
      console.log("maxprice 2", maxprice);

      setHouselistingtype(null);
      setHousePropertytype(null);
      setHousesurburb(null);
      setMaxprice(null);
      handleSearch();
    };
    /*
    
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
    */




  return (
    <><div class="container">

      <div class="row">
        <div class="col-1">

        </div>
        <div class="col">
          <form onSubmit={handleSearchLocal}>
            <div class="row" id="properties-row-one">
              

                <div class="col">
                <br/>

                  <div class="form-group">
                    <label for="houselistingtype"></label>
                    <select class="form-select"  id="houselistingtype" defaultValue={houselistingtype} onChange={(e) => setHouselistingtype(e.target.value)}>
                      <option selected>Listing Type</option>
                      <option value="Sale">Sale</option>
                      <option value="Rent">Rent</option>
                    </select>
                  </div>

                </div>
              
                <div class="col">
                <br/>                
                  <div class="form-group">
                    <label for="housepropertytype"></label>
                    <select class="form-select" id="housepropertytype" defaultValue={housepropertytype} onChange={(e) => setHousePropertytype(e.target.value)}>
                      <option selected>Property Type</option>
                      <option value="House">House</option>
                      <option value="Apartments">Apartments</option>
                      <option value="Townhouses">Townhouses</option>
                      <option value="Villas">Villas</option>
                      <option value="Office">Office</option>
                    </select>
                  </div>

                </div>
              
                <div class="col">
                  
                <br/><br/>
                  <input class="form-control" type="text" placeholder="Enter a location" name="housesurburb" defaultValue={housesurburb} onChange={(e) => setHousesurburb(e.target.value)}></input><br/>
                </div>
              
                <div class="col">
                <br/><br/>
                  <input class="form-control" type="text" placeholder="Max Price" name="maxprice" defaultValue={maxprice} onChange={(e) => setMaxprice(e.target.value)}></input><br/>
                </div>
              
                <div class="col">
                <br/><br/>
                <div id="div-home-btn-one">
                <button class="btn btn-primary  btn-block" type="submit" id="property-btn-one">Search</button><br/><br/><br/>
                </div>
                  
                </div>
              </div>
          </form>


        </div>
        <div class="col-1">

        </div>

      </div>
      
      <div class="row" id="properties-row-two">
        <div class="col-1">
        </div>

        <div class="col">
        
          <br></br>
          <h4 id="property-title">Properties</h4>

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

          {datahouse?.length > 0 ? (<>
                          {datahouse?.map((itemx, index) => (
                            
                            <tr key={itemx?.houseid}>


                            <td><img class="card-img-top" id="properties-image-one" src={itemx?.images[0]?.houseimageimageurl} alt="Card image cap" onClick={() => handleEachRowClick(itemx?.houseid)} ></img></td>
                            <td id="properties-table-entry"><br/><span id="properties-heading"><b>{itemx?.househeading}</b></span><br/><br/><span id="properties-price" onClick={() => handleEachRowClick(itemx?.houseid)}>Ksh. {itemx?.houseprice}<br/></span></td>
                            <td></td>

                            </tr>
                            ))}</>
          ) : (<><h4 id="properties-title-no-results">No search results found.</h4><br/><br/><br/><br/><br/><br/><br/><br/></> )}
                </tbody>
                </table>

        </div>

        <div class="col-1">
        </div>

      </div>

    <div >

      

    </div>
    </div>
    <Footer /></>
  );
}

export default Properties

/*
      <div class="row">

      <form onSubmit={handleSearchLocal}>
        <div class="form-group">
          <label for="houselistingtype"></label>
          <select class="form-control" id="houselistingtype">
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
          </select>
        </div>

        <div class="form-group">
          <label for="housepropertytype"></label>
          <select class="form-control" id="housepropertytype">
            <option selected>Choose...</option>
            <option value="House">House</option>
            <option value="Apartments">Apartments</option>
            <option value="Townhouses">Townhouses</option>
            <option value="Villas">Villas</option>
            <option value="Office">Office</option>
          </select>
        </div>

        

        <input class="form-control" type="text" placeholder="Enter a location" name="housesurburb"></input><br/>
        <input class="form-control" type="text" placeholder="Max Price" name="maxprice"></input><br/>

        <button class="btn btn-primary one" type="submit" id="btn-one">Submit</button><br/><br/><br/>
        
      </form>
      
      </div >
 */
import React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import istockone from './istockphoto-1158246435-2048x2048-transformed.jpeg';
import istocktwo from './istockphoto-943940212-2048x2048-transformed.jpeg';
import istockthree from './istockphoto-1186578902-2048x2048-transformed.jpeg';
import Footer from './Footer';


function Home(event) {
  const  navigate = useNavigate();

    const handleSearch = (event) =>{
      event.preventDefault();
      console.log(event.target.houselistingtype.value);
      console.log(event.target.housepropertytype.value);
      console.log(event.target.housesurburb.value);
      console.log(event.target.maxprice.value);
      let houselistingtype = event.target.houselistingtype.value;
      let housepropertytype = event.target.housepropertytype.value;
      
      let housesurburb = event.target.housesurburb.value;
      
      let maxprice = event.target.maxprice.value;

      
        console.log("housesurbur", housesurburb);

        console.log("houselistingtype", houselistingtype);
        console.log("housepropertytype", housepropertytype);

        if(houselistingtype === "Listing Type"){
          houselistingtype = "";
        }

        if(housepropertytype === "Property Type"){
          housepropertytype = "";
        }

        console.log("houselistingtype", houselistingtype);
        console.log("housepropertytype", housepropertytype);

        if(housepropertytype.length !== 0 && houselistingtype.length !== 0 && housesurburb.length !== 0 && maxprice.length !== 0){
          navigate({
            pathname: "/properties",
            search: createSearchParams({
              houselistingtype: houselistingtype,
              housepropertytype: housepropertytype,
              housesurburb: housesurburb,
              maxprice: maxprice,
            }).toString()
          });
        }
        
    };
  

  /*
      function handleAddTodo(event) {
        event.preventDefault();
        console.log(event.target.task.value);
        console.log(event.target.status.value);
        const task = event.target.elements.task.value;
        const status = event.target.elements.status.value;
        console.log("status:", status);
        const highestId = todos.reduce((maxId, item) => {
            return item.id > maxId ? item.id : maxId;
          }, 0);
          console.log("highestId", highestId);
        const todo = {
            id: highestId + 1,
            task: task,
            status: status
        };
        setTodos(prevTodos => {.
            inputRef.current.value = "";
            let todovar = prevTodos.concat(todo); 
            console.log("todovar 1", todovar);
  //          window.localStorage.setItem('todoLS1', todovar); 
            console.log("todovar 2", todovar);
//            console.log("window.localStorage.getItem('todoLS'): ", window.localStorage.setItem('todoLS'));
            return todovar;
        })
//        window.localStorage.setItem('MY_APP_STATE', JSON.stringify(todos));
    }
   */
  return (
    <>
    <div class="container-fluid">
      <div class="row" id="home-row-main-one">
        <div class="col-1 col-sm-1	col-md-1	col-lg-1 col-xl-1">

        </div>

        <div class="col">
          
        <form onSubmit={handleSearch}>
          <h1 id="title-home-row-one">Agents. Houses.</h1>
          <div class="row" id="home-row-one">
            

              <div class="col">
              <br/>

                <div class="form-group">
                  <label for="houselistingtype"></label>
                  <select class="form-select"  id="houselistingtype">
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
                  <select class="form-select" id="housepropertytype">
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
                <input class="form-control" type="text" placeholder="Enter a location" name="housesurburb"></input><br/>
              </div>
             
              <div class="col">
              <br/><br/>
                <input class="form-control" type="text" placeholder="Max Price" name="maxprice"></input><br/>
              </div>
             
              <div class="col">
              <br/><br/>
              <div id="div-home-btn-one">
              <button class="btn btn-primary  btn-block" type="submit" id="home-btn-one">Search</button><br/><br/><br/>
              </div>
                
              </div>
            </div>
        </form>
          
        </div>

        <div class="col-1  col-sm-1	col-md-1	col-lg-1 col-xl-1">

        </div>
      </div>

      <div class="row" id="home-row-main-two">
      <br></br><br></br>
        <h2 id="home-row-main-two-title-one">Features</h2>
      <div class="col"></div>

        <div class="col">
        <br></br><br></br>
          <div class="card">
            <img class="card-img-top" src={istockone} alt="Card image cap"></img>
            <br></br>
            <div class="card-body">
              <h5 class="card-title">Buy a home</h5>
              <br></br>
              <p class="card-text">Find your place with an immersive photo experience , including things you won’t find anywhere else.</p>
            </div>
            <br></br>
          </div>
          
        </div>
        
        <div class="col">
        <br></br><br></br>
          <div class="card">
            <img class="card-img-top" src={istocktwo} alt="Card image cap"></img>
            <br></br>
            <div class="card-body">
              <h5 class="card-title">Sell a home</h5>
              <br></br>
              <p class="card-text">No matter what path you take to sell your home,  <br/>we can help you navigate a successful sale.</p>
            </div>          
            <br></br>
          </div>
        </div>

        <div class="col">
        <br></br><br></br>
          <div class="card">
              <img class="card-img-top" src={istockthree} alt="Card image cap"></img>
              <br></br>
              <div class="card-body">
                <h5 class="card-title">Rent a home</h5>
                <br></br>
                <p class="card-text">We’re creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.</p>
              </div>          
              <br></br>
            </div>
        </div>
        <div class="col"></div>

      </div>
    </div>
    
    <Footer /></>
  );
}

export default Home
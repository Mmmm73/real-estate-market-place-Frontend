import React from 'react';

import { Routes as R, Route, Link } from 'react-router-dom';

import Home from './Home';
import About from './About';
//import Speakers from './Speakers';
import Signin from './Signin';
import Signup from './Signup';
import Mylisting from './Mylisting';
import Createlisting from './Createlisting';
import Eachlisting from './Eachlisting';
import Editlisting from './Editlisting';
import Properties from './Properties';
import Property from './Property';
import Bookmarks from './Bookmarks';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from 'react-router-dom';
import Bookmark from './Bookmark';


function Routes() {
  let token;
  if(localStorage.getItem('token')){
    token = localStorage.getItem('token');
    console.log("xxxxxxxxx logged in  33", token);
  }

  const navigate = useNavigate();

  const logout = () => {
    navigate('/signup');
//    this.context.router.transitionTo('/signup');
    localStorage.removeItem('token');
    
//    window.location.reload();
  };

  /*
          <nav >
        <div class="menu">
          <div>

          </div>
          
          <div>
            <Link class="link" to="/">Home</Link>
          </div>
          <div>
            <Link class="link" to="/about">About</Link>
          </div>
          <div>
            <Link class="link" to="/signin">Sign In</Link>
          </div>

        </div>
        </nav>
  */

        /*
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div>

            </div>
            
            <div>
              <Link class="link" to="/">Home</Link>
            </div>
            
            <div>
              <Link class="link" to="/about">About</Link>
            </div>
            
            <div>
              <Link class="link" to="/mylisting">Manage Property</Link>
              <Link class="link" to="/bookmarks">Bookmarks</Link>
            </div>
            
            <div>
              <Link class="link" onClick={logout}>Logout</Link>
            </div>


        </div>
        

      </nav> 
        */

  return (
    
    <>

      {token ? (
               <Navbar expand="lg" className="bg-teal" >
               <Container>

               <Navbar.Brand href="/" id="logo-nav-bar">Housing</Navbar.Brand>
                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
                 <Navbar.Collapse id="basic-navbar-nav">
                   <Nav className="ms-auto" >
                    


                        <Link className="link me-5" class="link" to="/" id="link1">Home</Link>


                        <NavDropdown title="Options" id="basic-nav-dropdown">
                          <NavDropdown.Item id="nav-link-dropdown"><Link class="link" to="/mylisting" id="nav-link-dropdown-1">Manage Property</Link></NavDropdown.Item>
                          
                          <NavDropdown.Divider />
                          <NavDropdown.Item  id="nav-link-dropdown"><Link class="link" to="/bookmarks" id="nav-link-dropdown-1">Bookmarks</Link></NavDropdown.Item>
                        </NavDropdown>
                        <div id="logout-link">
                          <Link class="link" className="link me-5" onClick={logout} id="link2">Logout</Link>
                        </div>
                        


                   </Nav>
                 </Navbar.Collapse>
               </Container>
             </Navbar>

      ) : (
        
        <Navbar expand="lg" className="bg-teal" >
          <Container>
            <Navbar.Brand href="/" id="logo-nav-bar">Housing</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto" >

                  <Link className="link me-5" class="link" to="/">Home</Link>

                  <Link className="link me-5" class="link" to="/signin">Sign In</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
          

      <R>

              <Route exact path="/" element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/signin" element={<Signin/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/mylisting" element={<Mylisting/>}/>
              <Route path="/createlisting" element={<Createlisting/>}/>
              <Route path="/eachlisting/:houseid" element={<Eachlisting/>}/>
              <Route path="/editlisting/:houseid" element={<Editlisting/>}/>
              <Route path="/properties" element={<Properties/>}/>
              <Route path="/property/:houseid" element={<Property/>}/>
              <Route path="/bookmarks" element={<Bookmarks/>}/>
              <Route path="/bookmark/:houseid" element={<Bookmark/>}/>
          </R></>
  );
}

export default Routes;
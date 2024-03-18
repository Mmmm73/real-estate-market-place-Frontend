import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  const handleSubmit = async event => {
    event.preventDefault(); 

    let result = validateForm();

    if(result === true){
      const signInData = {
        email: email,
        password: password,
      };

      console.log("signInData", signInData);


      try {
        const response = await fetch('/node/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signInData),

        });
        const data = await response.json();

        
        if (response.ok) {
          localStorage.setItem('token', data.jwt);
          navigate('/');
         // window.location.reload();
        } else {
          setShowAlert(true);
          setAlertMessage('Error. Invalid email or password.');
        }
      } catch (error) {
        setShowAlert(true);
        setAlertMessage('An error occurred while processing the request');
      }
    }
    
  };
  



    // Function which will validate the input data whenever submit button is clicked.

  function validateForm() {
    // Check if the Email is an Empty string or not.

    if (email.length === 0) {
      setShowAlert(true);
      setAlertMessage('Invalid Form, Email Address can not be empty.');
      return false;
    }

    if (password.length === 0) {
      setShowAlert(true);
      setAlertMessage('Invalid Form, Password can not be empty.');
      return false;
    }

    // if all the conditions are valid, this means that the form is valid

    setShowAlert(false);
    setAlertMessage('');
    return true;
    
  }
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup');
  };

/*<div class="col-2 col-sm-2 col-md-2	col-lg-2 col-xl-2" */
  return (
    <><div class="container">
      <div class="row" id="rowone">
        <div class="col-3">

        </div>
        <div class="col-6" id="row1-col-2">
          
          {showAlert && (
          <><div className="alert alert-danger" role="alert" id="sigin-alert">
              {alertMessage}
            </div></>
          )}
          <h4 id="signin-title">Sign in</h4>
          <br/>
          
          <div class="row">
            <div class="col-md-3	col-lg-3	col-xl-3 col-2	col-sm-1">

            </div>
            <div class="col">
              <form onSubmit={handleSubmit}>
                

                <input id="email" name="email" class="form-control" type="email" placeholder="Email" onChange={event => setEmail(event.target.value)} /><br /><br />
            

                <input id="password" name="password" class="form-control" type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} /><br />
                
                <button id="signin-button"class="btn btn-primary" type="submit">Sign In</button><br /><br />
                
                <p onClick={handleClick } id="signin-signup-link">Don't have an account? Sign Up?</p><br /><br />
                
              </form>
            </div>
            <div class="col-md-3	col-lg-3	col-xl-3 col-2	col-sm-1">

            </div>
          </div>



        </div>
        <div class="col-3">

        </div>
        </div>

        </div>

</>
  );
}

export default Signin
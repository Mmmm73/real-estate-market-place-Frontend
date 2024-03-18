import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  const handleSubmit = async event => {
    event.preventDefault(); 
 //   let result = true;

    let result = validateForm();

    if(result === true){
      const signUpData = {
        email: email,
        password: password,
      };

      console.log("True!");
      console.log("signUpData", signUpData);


      try {
        console.log("111111111");
        const response = await fetch('/node/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signUpData),

        });
        console.log("responsexxxxxxxxxx:", response);
        console.log("responsexxxxxxxxxx:", response.status);
        const data = await response.json();
        console.log("data:", data);
        console.log("data.error:", data.error);
        console.log("responsexxxxxxxxxx:", response.ok);
        console.log("responsexxxxxxxxxx:", response.status);

        
        if (response.ok) {
          console.log("response.userId", data.userId);
          navigate('/signin');

        } else {
          if(data.error === "Email already in use"){
            setShowAlert(true);
            setAlertMessage('Email already in use.');
          }
          else{
            setShowAlert(true);
            setAlertMessage('Error.');
          }
        }
      } catch (error) {
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

    // check if the password follows constraints or not.

    // if password length is less than 8 characters, alert invalid form.

    if (password.length < 8) {
      setShowAlert(true);
      setAlertMessage('Invalid Form, Password must contain greater than or equal to 8 characters.');
      return false;
    }

    // variable to count upper case characters in the password.
    let countUpperCase = 0
    // variable to count lowercase characters in the password.
    let countLowerCase = 0
    // variable to count digit characters in the password.
    let countDigit = 0
    // variable to count special characters in the password.
    let countSpecialCharacters = 0

    for (let i = 0; i < password.length; i++) {
      const specialChars = [
        '!',
        '@',
        '#',
        '$',
        '%',
        '^',
        '&',
        '*',
        '(',
        ')',
        '_',
        '-',
        '+',
        '=',
        '[',
        '{',
        ']',
        '}',
        ':',
        ';',
        '<',
        '>',
      ]

      if (specialChars.includes(password[i])) {
        // this means that the character is special, so increment countSpecialCharacters
        countSpecialCharacters++
      } else if (!isNaN(password[i] * 1)) {
        // this means that the character is a digit, so increment countDigit
        countDigit++
      } else {
        if (password[i] === password[i].toUpperCase()) {
          // this means that the character is an upper case character, so increment countUpperCase
          countUpperCase++
        }
        if (password[i] === password[i].toLowerCase()) {
          // this means that the character is lowercase, so increment countUpperCase
          countLowerCase++
        }
      }
    }

    if (countLowerCase === 0) {
      // invalid form, 0 lowercase characters
      setShowAlert(true);
      setAlertMessage('Invalid Form, 0 lower case characters in password.');
      return false;
    }

    if (countUpperCase === 0) {
      // invalid form, 0 upper case characters
      setShowAlert(true);
      setAlertMessage('Invalid Form, 0 upper case characters in password.');
      return false;
    }

    if (countDigit === 0) {
      // invalid form, 0 digit characters
      setShowAlert(true);
      setAlertMessage('Invalid Form, 0 digit characters in password.');
      return false;
    }

    if (countSpecialCharacters === 0) {
      // invalid form, 0 special characters characters
      setShowAlert(true);
      setAlertMessage('Invalid Form, 0 special characters in password.');
      return false;
    }

    // if all the conditions are valid, this means that the form is valid

    setShowAlert(false);
    setAlertMessage('');
    return true;
    
  }
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signin');
  };


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
        <h4 id="signin-title">Sign up</h4>
        <br/>
        
        <div class="row">
          <div class="col-md-3	col-lg-3	col-xl-3 col-2	col-sm-1">

          </div>
          <div class="col">
            <form onSubmit={handleSubmit}>
              

              <input id="email" name="email" class="form-control" type="email" placeholder="Email" onChange={event => setEmail(event.target.value)} /><br /><br />
          

              <input id="password" name="password" class="form-control" type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} /><br />
              
              <button id="signin-button"class="btn btn-primary" type="submit">Sign Up</button><br /><br />
              
              <p onClick={handleClick} id="signin-signup-link">Sign In?</p><br /><br />
              
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

export default Signup
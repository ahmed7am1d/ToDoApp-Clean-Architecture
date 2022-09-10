import { useEffect, useState } from "react";
import "./styles/mainlayout/app.scss";

function App() {
  //[1] useState for saving the email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  //[2] function to handle the change of the email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  //[3] function to handle the change of the password
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  //[4] function to handle change of the first name
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }
  //[5] function to handle change of the last name
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }
  //[6] function to handle the change of phone Number
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  }
  //[7] set user token 
  const [userToken, setUserToken] = useState("");


  //[7] function to handle the submit of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    return fetch('http://localhost:5133/auth/register',{
      method: 'POST',
      body: JSON.stringify({FirstName: firstName, LastName: lastName, Email: email, Password: password, PhoneNumber: phoneNumber}),
      headers: {
        'Content-Type': 'application/json'
    }
    }).then((response) => {
      return response.json();
    }).then(function(data){
      console.log(data);
      setUserToken(data.token);
    }).catch(error => {
      console.log(error.body);
    })
  }


  return (
    <div className="App">
      <div className="inputGroupWrapper">
        <input type="text" placeholder="First Name..." value={firstName} onChange={handleFirstNameChange}/>
        <input type="text" placeholder="Last Name..." value={lastName} onChange={handleLastNameChange}/>
        <input type="text" placeholder="Email..." value={email} onChange={handleEmailChange}/>
        <input type="text" placeholder="PhoneNumber..." value={phoneNumber} onChange={handlePhoneNumberChange}/>
        <input type="password" placeholder="Password..."value={password} onChange={handlePasswordChange} /> 

        <button onClick={handleSubmit}>Register</button>
        <h3>Your Token:</h3>
        <p>{userToken}</p>
      </div>
    </div>
  );
}

export default App;

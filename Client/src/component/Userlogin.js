import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Userlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserDetails] = useState({});

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(email==""){
      alert("Enter Email")
      return

    }

    if(password==''){
      alert("Enter Password")
      return

    }
    try {
      const response = await fetch('http://localhost:5001/api/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("========== Fetched Data :", data.userDetails);
      if (data.success) {
        setUserDetails(data.userDetails);

        console.log("===>From UserLogin.js", data.userDetails);

        navigate('/Udash', { state: { userDetails: data.userDetails } });
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };


  return (
    <>
      <div className="body-background">
        <div className="section">
          <div>
            <div className="row full-height justify-content-center allbackgroundcolor">
              <div className="col-12 text-center align-self-center py-5">
                <div className="section pb-5 pt-5 pt-sm-2 text-center">
                  <label htmlFor="reg-log"></label>
                  <div className="card-3d-wrap mx-auto">
                    <div className="card-3d-wrapper">
                      <div className="card-front mycontainer">
                        <div className="center-wrap">
                          <div className="section text-center ">
                            <h4 className="mb-4 pb-3">User's Log In</h4>

                            <form onSubmit={handleLogin}>
                              <div className="form-group">
                                <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <i className="input-icon uil uil-at"></i>
                              </div>
                              <div className="form-group mt-2">
                                <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <i className="input-icon uil uil-lock-alt"></i>
                              </div>
                              <button type="submit" className="btn mt-4">Submit</button>

                            </form>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userlogin;

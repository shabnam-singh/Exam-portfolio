import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Adminlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if(email==""){
      alert("Enter Email")
      return

    }

    if(password==''){
      alert("Enter Password")
      return

    }

    if (email === 'admin@gmail.com' && password === 'admin') {
      navigate('/adash');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <>
      <body className="body-background">
        <div className="section allbackgroundcolor">
          <div className="container">
            <div className="row full-height justify-content-center">
              <div className="col-12 text-center align-self-center py-5">
                <div className="section pb-5 pt-5 pt-sm-2 text-center">
                  {/* <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6> */}
                  <input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                  {/* <label htmlFor="reg-log"></label> */}
                  <div className="card-3d-wrap mx-auto">
                    <div className="card-3d-wrapper">
                      <div className="card-front mycontainer">
                        <div className="center-wrap">
                          <div className="section text-center ">
                            <h4 className="mb-4 pb-3">Admin's Sign In</h4>
                            <form onSubmit={handleLogin}>
                            <div className="form-group">
                              <input
                                type="email"
                                name="logemail"
                                className="form-style"
                                placeholder="Your Email"
                                id="logemail"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                className="form-style"
                                placeholder="Your Password"
                                id="logpass"
                                autoComplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button type="submit" className="btn mt-4">Submit</button>
                            </form>
                            <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p>
                          </div>
                        </div>
                      </div>
                      <div className="card-back mycontainer">
                        <div className="center-wrap">
                          <div className="section text-center">
                            <h4 className="mb-4 pb-3">Admin's Sign Up</h4>
                            <div className="form-group">
                              <input type="text" name="logname" className="form-style" placeholder="Your Full Name" id="logname" autoComplete="off"/>
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off"/>
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off"/>
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <a href="#" className="btn mt-4">submit</a>
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
      </body>
    </>
  );
}

export default Adminlogin;

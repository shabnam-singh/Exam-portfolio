import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
export default function Adash() {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/add-user');
  };

  const AssignTestCard = () => {
    navigate('/studentlist');
  };

  return (
    <>
      <div className="container-fluid">
        <button className="btn btn-dark mt-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasLeft">Categories</button>
        <div className='head'>
          <h1>Admin Page</h1>
        </div>
        <br />
        <div className='parent1'>
          <div class="col py-3">
            <div className="col py-3">
              <div class="container mt-2">

                <div class="row">
                  <div className="col-md-3 col-sm-6">
                    <div className="card card-block" onClick={handleCardClick}>
                      <h4 className="card-title text-right"><i className="material-icons"></i></h4>
                      <img src="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg" alt="Photo of sunset" />
                      <h2 className="card-title mt-3 mb-3">Add Students</h2>
                      <p className="card-text">Add new students here.</p>
                      <button type="button" className="btn btn-dark">Add Students</button>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-6">
                    <div class="card card-block" onClick={AssignTestCard}>
                      <h4 class="card-title text-right"><i class="material-icons"></i></h4>
                      <img src="https://static.pexels.com/photos/7357/startup-photos.jpg" alt="Photo of sunset" />
                      <h2 class="card-title  mt-3 mb-3">Exam Status</h2>
                      <p class="card-text">Check status of the user.</p>
                      <button type="button" class="btn btn-dark">Check Status</button>
                    </div>
                  </div>
             
                 
                </div>

              </div>

            </div>


          </div>
        </div>
        <div className="row flex-nowrap ">

          <div class="container-fluid ">
            <div class="row flex-nowrap bg-secondary">



              <div className='categai'>

                <div className="offcanvas offcanvas-start" tabindex="1" id="offcanvasLeft" aria-labelledby="offcanvasLeftLabel bg-secondary">
                  <div className="offcanvas-header bg-secondary">
                    <h5 className="offcanvas-title" id="offcanvasLeftLabel">EXAM DETAILS</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div className="offcanvas-body">
                    <section className='container section-2' >

                      <h4>ADMIN'S</h4>
                      <br />
                      <br />
                      <div className="column">

                        <div className="first">
                          <button to="subjects" type="button" onClick={() => navigate('/subjects')} className="btn  d-flex flex-column align-items-center w-50">
                            SUBJECT'S
                          </button>
                        </div><br />
                       
                      </div>

                      <div className="column">
                        <div className="first">
                         
                          <button to="subjects" type="button" onClick={() => navigate('/questions')} className="btn  d-flex flex-column align-items-center w-50">
                            QUESTIONS
                          </button>
                        </div>
                        <br />
                        <div className="first">
                        
                          <button to="subjects" type="button" onClick={() => navigate('/result')} className="btn  d-flex flex-column align-items-center w-50">
                            RESULTS
                          </button>
                        </div>
                        <br />
                      </div>
                      <div className="column">
                        <div className="first">
                         
                          <button to="subjects" type="button" onClick={() => navigate('/studentlist')} className="btn  d-flex flex-column align-items-center w-50">
                            STUDENT'S LIST
                          </button>
                        </div>
                        <br />
                      </div>
                    </section>

                  </div>
                </div>
              </div>

            </div>
          </div>


        </div>
      </div>
    </>
  )
}

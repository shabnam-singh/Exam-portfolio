import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Udash.css';

function TestInstructionsModal({ show, onClose, onStart }) {
  const [isChecked, setIsChecked] = useState(false);
  const [color, setColor] = useState("5px solid red");

  function dialog(e) {
    setIsChecked(e.target.checked);
    if (color === "5px solid red") {
      setColor("5px dashed green");
    } else {
      setColor("5px solid red");
    }
  }

  return (
    <div className={`modal ${show ? 'show' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className='content-center'>
          <h2>Test Instructions</h2>
          <p>Please read the following instructions carefully before starting the test:</p>
          <ul>
            <li>The test contains 10 questions.</li>
            <li>You have 20 minutes to complete the test.</li>
            <li>This test will automatically submit after the given time.</li>
            <li>Make sure to stay in full-screen mode during the test.</li>
            <li>If you exit full-screen mode, the test will be closed.</li>
            <li>Do not refresh the page or navigate away from the test.</li>
          </ul>
        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            id="termsCheckbox"
            checked={isChecked}
            onChange={dialog}
            style={{ marginRight: "10px" }}
          />
          <label htmlFor="termsCheckbox" style={{ border: color, padding: "8px 2px", borderRadius: "10px" }}>Accept Terms and Conditions</label>
        </div>

        <button
          className="btn btn-primary"
          onClick={onStart}
          disabled={!isChecked}
        >
          Start Test Now
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default function Udash() {
  const location = useLocation();
  const userDetails = location.state.userDetails; // Getting user details from location state
  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedExamIndex, setSelectedExamIndex] = useState(null);

  const exitHandler = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      setIsFullScreen(false);
      alert('You exited fullscreen mode. Test closed.');
    }
  };

  useEffect(() => {
    if (isFullScreen) {
      document.addEventListener('fullscreenchange', exitHandler);
      document.addEventListener('webkitfullscreenchange', exitHandler);
      document.addEventListener('mozfullscreenchange', exitHandler);
      document.addEventListener('MSFullscreenChange', exitHandler);
    }

    return () => {
      document.removeEventListener('fullscreenchange', exitHandler);
      document.removeEventListener('webkitfullscreenchange', exitHandler);
      document.removeEventListener('mozfullscreenchange', exitHandler);
      document.removeEventListener('MSFullscreenChange', exitHandler);
    };
  }, [isFullScreen]);

  const handleStartButtonClick = (index) => {
    setSelectedExamIndex(index);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalStart = async () => {
    const selectedExam = userDetails.exams[selectedExamIndex];
    const newdata = { email: userDetails.email, examName: selectedExam.examName };
    console.log(newdata);

    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        await document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        await document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        await document.documentElement.msRequestFullscreen();
      }

      setIsFullScreen(true);

      navigate('/exam-screen', { state: { userDetails: newdata, originalUserDetails:userDetails } });
    } catch (error) {
      console.error('Fullscreen request failed:', error);
    }

    setShowModal(false);
  };

  return (
    <>
      <div className="head">
        <h1>----WELCOME {userDetails.name}----</h1>
      </div>
      <div className="exam-cards">
        {userDetails.exams.map((exam, index) => (
          <div className="exam-card" key={index}>
            <p><strong>Exam Name:</strong> {exam.examName}</p>
            <p><strong>Exam Status:</strong> {exam.examStatus}</p>
            <p><strong>Number of Questions:</strong> 10</p>
            <p><strong>Time:</strong> 20 minutes</p>
            {exam.examStatus !== 'Completed' && (
              <button
                className="btn btn-danger"
                onClick={() => handleStartButtonClick(index)}
              >
                START EXAM
              </button>
            )}
          </div>
        ))}
      </div>
      <TestInstructionsModal
        show={showModal}
        onClose={handleModalClose}
        onStart={handleModalStart}
      />
    </>
  );
}

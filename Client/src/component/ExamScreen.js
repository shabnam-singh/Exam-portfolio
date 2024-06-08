import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ExamScreen.css'; // Import CSS file for styling

export default function ExamScreen() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.userDetails.email;
  const examName = location.state.userDetails.examName;

  const originalUserDetails=location.state.originalUserDetails;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const encodedExamName = encodeURIComponent(examName);
        const response = await fetch(`http://localhost:5001/api/getallquestionswithexamname?examName=${encodedExamName}`);
        const data = await response.json();
        if(response.status==404){
          alert("No question found \n Contact Admin")
          return
        }
        setQuestions(data.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [examName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0 && !isSubmitted) {
        setTimeLeft(timeLeft - 1);
      } else if (!isSubmitted) {
        handleSubmit();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isSubmitted]);

  const handleOptionSelect = (option) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: option
    });
  };

  const handlePrevButtonClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextButtonClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = async () => {
    if (isSubmitted) return; // Prevent multiple submissions

    setIsSubmitted(true);

    const results = questions.map((question, index) => ({
      question: question.question,
      selectedAnswer: selectedOptions[index] || "NA",
      correctAnswer: question.correctAnswer,
    }));

    console.log("===========>:",results);

    try {
      const response = await fetch('http://localhost:5001/api/submitexam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          examName,
          results,
        }),
      });
      const data = await response.json();
      console.log(data);

      if (data.success) {
        alert('Exam submitted successfully!');
        navigate('/'); // Navigate back to home or any other page after submission
      } else {
        alert('Failed to submit exam.');
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
    }
  };

  const exitHandler = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      console.log(originalUserDetails)
      navigate('/Udash', { state: { userDetails: originalUserDetails } });  
    }
  };

  useEffect(() => {
    // Close the test if the user exits full-screen mode
    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);

    return () => {
      document.removeEventListener('fullscreenchange', exitHandler);
      document.removeEventListener('webkitfullscreenchange', exitHandler);
      document.removeEventListener('mozfullscreenchange', exitHandler);
      document.removeEventListener('MSFullscreenChange', exitHandler);
    };
  }, []);

  return (
    <div className="exam-screen">
      <div className="top-bar">
        <strong>Question {currentQuestionIndex + 1} of {questions.length}</strong>
        <strong>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</strong>
      </div>
      {questions.length > 0 ? (
        <div>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <div className="options-container">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="option">
                <input
                  type="radio"
                  id={`option${index}`}
                  name="options"
                  value={option}
                  checked={selectedOptions[currentQuestionIndex] === option}
                  onChange={() => handleOptionSelect(option)}
                />
                <label htmlFor={`option${index}`}>{option}</label>
              </div>
            ))}
          </div>
          <div className="navigation-buttons">
            <button disabled={currentQuestionIndex === 0} onClick={handlePrevButtonClick}>Previous</button>
            <button disabled={currentQuestionIndex === questions.length - 1} onClick={handleNextButtonClick}>Next</button>
          </div>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
      <div className="footer">
        <button className="submit-button" onClick={handleSubmit}>Submit Test</button>
      </div>
    </div>
  );
}

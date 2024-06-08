import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Subjects() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestionsFromDB = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/getallquestions');
        if(response.status==404){
          setQuestions([])
          return
        }
        const data = await response.json();
        setQuestions(data.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestionsFromDB();
  }, []);

  const handleCardClick = (subject) => {
    const subjectQuestions = questions.filter(q => q.examName === subject);
    setFilteredQuestions(subjectQuestions);
  };

  return (
    <>
      <div className='head'>
        <h1>----ALL-SUBJECT'S----</h1>
      </div>

      <div className="col py-3">
        <div className="container mt-2">
          <div className="row">
            {['Java', 'Python', 'C', 'C++'].map(subject => (
              <div className="col-md-3 col-sm-6" key={subject}>
                <div className="card card-block" onClick={() => handleCardClick(subject)}>
                  <h4 className="card-title text-right"><i className="material-icons"></i></h4>
                  <img src={`https://source.unsplash.com/random?${subject+" Programming"}`} alt={`${subject}`} />
                  <h2 className="card-title mt-3 mb-3">{subject}</h2>
                  <p className="card-text">Click to view questions for {subject}.</p>
                  <button type="button" className="btn btn-dark">View Detail's</button>
                </div>
              </div>
            ))}
          </div>

          {filteredQuestions.length > 0 && (
            <div className="questions-list mt-4">
              <h3>Questions for Selected Subject</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Exam Name</th>
                    <th>Question</th>
                    <th>Options</th>
                    <th>Correct Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuestions.map((q, index) => (
                    <tr key={index}>
                      <td>{q.examName}</td>
                      <td>{q.question}</td>
                      <td>{q.options.join(', ')}</td>
                      <td>{q.correctAnswer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

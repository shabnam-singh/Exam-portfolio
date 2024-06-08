import React, { useState, useEffect } from 'react';
import './Questions.css';

export default function Questions() {
  const [examName, setExamName] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [dbQuestions, setDbQuestions] = useState([]);

  useEffect(() => {
    fetchQuestionsFromDB();
  }, []);

  const fetchQuestionsFromDB = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/getallquestions');
      const result = await response.json();
     
      console.log("===============>",result.data);
      
      if (Array.isArray(result.data)) {
        setDbQuestions(result.data);
      } else {
        setDbQuestions([]);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setDbQuestions([]); 
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = () => {
    if(examName==="" || question==="" ||options===""||correctAnswer===""){
      alert("All Fields are mandatory")
      return
    }
    if (!options.includes(correctAnswer)) {
      alert("Correct answer is not matching any of the options");
      return; 
    }

    if(new Set(options).size!=options.length){
      alert("Options Must Be Unique")
      return
    }


    const newQuestion = {
      examName,
      question,
      options,
      correctAnswer,
    };
    setQuestions([...questions, newQuestion]);
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };



  const handleSubmitQuestions = async () => {
    if(questions.length===0){
      alert("Add Some Questions First ")
      return
    }

    try {
      const response = await fetch('http://localhost:5001/api/addques', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({questions}),
      });
      const result = await response.json();
      if (result.success) {
        // alert('Questions added successfully!');
        fetchQuestionsFromDB(); // Refresh the list of questions from the database
        setQuestions([]); // Clear local state
      } else {
        alert('Error adding questions');
      }
    } catch (error) {
      console.error('Error submitting questions:', error);
    }
  };
  

  const handleEditQuestion = (index) => {
    const questionToEdit = questions[index];
    setExamName(questionToEdit.examName);
    setQuestion(questionToEdit.question);
    setOptions(questionToEdit.options);
    setCorrectAnswer(questionToEdit.correctAnswer);
    handleDeleteQuestion(index);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  return (
    <div className="questions-container">
      <h2>Add MCQ Questions</h2>
      <div className="question-form">
        <div className="form-group">
          <label>Exam Name:</label>
          <select value={examName} onChange={(e) => setExamName(e.target.value)}>
            <option value="">Select Exam</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="C">C</option>
            <option value="C++">C++</option>
          </select>
        </div>
        <div className="form-group">
          <label>Question:</label>
          <textarea
            type="text"
            cols={60}
            rows={5}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
        </div>
        <div className="form-group">
          <label>Correct Answer:</label>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </div>
        <button onClick={handleAddQuestion} className="btn btn-primary">
          Add Question
        </button>
        
      </div>

      <div className="questions-list">
  <h3>Added Questions</h3>
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Exam Name</th>
        <th>Question</th>
        <th>Options</th>
        <th>Correct Answer</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {questions.map((q, index) => (
        <tr key={index}>
          <td>{q.examName}</td>
          <td>{q.question}</td>
          <td>{q.options.join(', ')}</td>
          <td>{q.correctAnswer}</td>
          <td>
            <button onClick={() => handleEditQuestion(index)} className="btn btn-secondary">
              Edit
            </button>
          </td>
          <td>
            <button onClick={() => handleDeleteQuestion(index)} className="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      <center>
      <button onClick={handleSubmitQuestions} className="btn btn-success">
          Submit Questions
        </button>
      </center>

      <div className="questions-db-list">
        <h3>All Questions in Database</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Question</th>
              <th>Options</th>
              <th>Correct Answer</th>
            </tr>
          </thead>
          <tbody>
            {dbQuestions.map((q, index) => (
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
      
      
    </div>
    
  );
}

import React, { useState } from 'react';
import './AddUser.css'; // Import the CSS file

function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [examName, setExamName] = useState('');
  const [btntxt, setbtntxt] = useState("Add User");



  const handleSubmit = async (e) => {
    e.preventDefault();
    setbtntxt("Please Wait");
    const user = { name, email, dob, examName };

    const response = await fetch('http://localhost:5001/api/adduser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      alert('User added successfully!\nA confirmation email has been sent to your email. Please check the spam folder as well.');
      // Clear the form
      setName('');
      setEmail('');
      setDob('');
      setExamName('');
    } else if(response.status==400) {
      alert('User already Registered');

    }
    else{
      console.log("Error in Adding user.")
    }
    setbtntxt("Add User");

  };

  return (
    <div className="add-user-container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Exam Name:</label>
          <select value={examName} onChange={(e) => setExamName(e.target.value)} required>
            <option value="" disabled>Select Exam</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="C">C</option>
            <option value="C++">C++</option>
          </select>
        </div>
        <button type="submit">{btntxt}</button>
      </form>
    </div>
  );
}

export default AddUser;

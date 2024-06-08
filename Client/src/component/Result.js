import React, { useEffect, useState } from 'react';
import './Result.css'; // Import CSS file for styling

export default function Result() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnNames, setBtnNames] = useState([]); // Array to manage button texts

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/getallexamuser');
        const data = await response.json();
        setStudents(data);
        // Initialize the button names state with "Send Result" for each exam
        const initialBtnNames = data.flatMap(student => student.exams.map(() => 'Send Result'));
        setBtnNames(initialBtnNames);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSendResult = async (email, examName, score, estatus, index) => {
    var updatedBtnNames = [...btnNames];
    updatedBtnNames[index] = 'Please Wait';
    setBtnNames(updatedBtnNames);

    try {
      const response = await fetch('http://localhost:5001/api/sendresults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, examName, score, estatus }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Mail sent successfully');
      } else {
        alert('Error in sending mail');
      }
    } catch (error) {
      console.error('Error sending result:', error);
      alert('Error in sending mail');
    }

    updatedBtnNames = [...btnNames];

    updatedBtnNames[index] = 'Send Result';
    setBtnNames(updatedBtnNames);
  };

  return (
    <>
      <h1>Student Results</h1>
      <div className="table-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>DoB</th>
                <th>Exam Name</th>
                <th>Score</th>
                <th>Status</th>
                <th>Send Result</th>
              </tr>
            </thead>
            <tbody>
              {students.flatMap((student, studentIndex) => (
                student.exams.map((exam, examIndex) => {
                  const btnIndex = studentIndex * students[0].exams.length + examIndex;
                  return (
                    <tr key={`${student._id}-${examIndex}`}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{formatDateOfBirth(student.dob)}</td>
                      <td>{exam.examName}</td>
                      <td>{exam.result}</td>
                      <td>{getStatus(exam.result)}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSendResult(student.email, exam.examName, exam.result, getStatus(exam.result), btnIndex)}
                          disabled={exam.result === 'None'}
                        >
                          {btnNames[btnIndex]}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );

  function formatDateOfBirth(dob) {
    const date = new Date(dob);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  function getStatus(result) {
    if (result === 'None' || !result) return 'Not Completed';
    const score = parseInt(result.split('/')[0], 10);
    return score > 4 ? 'Pass' : 'Fail';
  }
}

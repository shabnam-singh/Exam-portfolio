import React, { useEffect, useState } from 'react';

export default function Studentlist() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/getallexamuser');
        if (response.status === 404) {
          setLoading(false);
          return;
        }
        const data = await response.json();
        setStudents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const formatDateOfBirth = (dob) => {
    const date = new Date(dob);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <br />
      <br />
      <div className="table1">
        <div className="ptable">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-danger">
              <thead>
                <tr className="table table-dark">
                  <th scope="col">S.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Dob</th>
                  <th scope="col">Exam Name</th>
                  <th scope="col">Exam Status</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                {students.flatMap((student, studentIndex) =>
                  student.exams.map((exam, examIndex) => (
                    <tr key={`${student._id}-${examIndex}`}>
                      <td>{studentIndex + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{formatDateOfBirth(student.dob)}</td>
                      <td>{exam.examName}</td>
                      <td>{exam.examStatus || 'Pending'}</td>
                      <td>{exam.result || 'NA'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

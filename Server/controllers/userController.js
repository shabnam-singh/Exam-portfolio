const User = require("../models/userModel");

const mailer = require('../helpers/mailer');

const ExamUser = require("../models/examUser");
const allquestions = require("../models/allquestions");

const formatDateOfBirth = (dob) => {
    const date = new Date(dob); // Convert string to Date object
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (months are zero-indexed) and pad with leading zero if necessary
    const year = date.getFullYear(); // Get full year
    return `${day}${month}${year}`; // Concatenate day, month, and year in desired format
};


const addUser = async (req, res) => {
    console.log("=========> Add User Endpoint Hitted <============");
    try {
        const { name, email, dob, examName } = req.body;
        console.log(name, email, dob, examName);

        // Check if the user already exists based on email
        const existingUser = await ExamUser.findOne({ email });

        if (existingUser) {
            // Check if the exam already exists for this user
            const examExists = existingUser.exams.some(exam => exam.examName === examName);

            if (examExists) {
                return res.status(400).json({
                    success: false,
                    msg: "Exam already exists for this user!"
                });
            }

            // Add the new exam to the user's exams array
            existingUser.exams.push({
                examName,
                examStatus: 'Not Completed',
                result: 'None',
                results: []
            });

            await existingUser.save();

            // Send welcome email
            const msg = `
           <p>Hi ${name},</p>
           <p>Welcome to the <b><i>Online Exam Center</i></b>!</p>
           <p>Register for the exam: <b>${examName}</b></p>
           <p>You can log in to your account using your email and your date of birth.</p>
           <p>For example, if your DOB is <b>DD-MM-YYYY</b>, then your password is <b>DDMMYYYY</b>.</p>
           <p>Happy learning...</p>
           <p>Happy coding...</p>
       `;

            console.log("Sending Mail...");
            await mailer.sendMail(email, "Registration Successful", msg);
            console.log("Mail Sent...");


            return res.status(200).json({
                success: true,
                msg: "Exam added successfully to existing user",
                user: existingUser
            });
        } else {
            // Create and save the new user
            const password = formatDateOfBirth(dob);
            console.log(password);
            const newUser = new ExamUser({
                name,
                email,
                dob,
                password,
                exams: [{
                    examName,
                    examStatus: 'Not Completed',
                    result: 'None',
                    results: []
                }]
            });

            const userData = await newUser.save();

            // Send welcome email
            const msg = `
    <p>Hi ${name},</p>
    <p>Welcome to the <b><i>Online Exam Center</i></b>!</p>
           <p>Register for the exam: <b>${examName}</b></p>
    <p>You can log in to your account using your email and your date of birth.</p>
    <p>For example, if your DOB is <b>DD-MM-YYYY</b>, then your password is <b>DDMMYYYY</b>.</p>
    <p>Happy learning...</p>
    <p>Happy coding...</p>
`;

            console.log("Sending Mail...");
            await mailer.sendMail(email, "Registration Successful", msg);
            console.log("Mail Sent...");


            return res.status(200).json({
                success: true,
                msg: "Registered successfully",
                user: userData
            });
        }

    } catch (error) {
        console.error('Error adding user:', error);

        return res.status(500).json({
            success: false,
            msg: "An error occurred while registering the user",
            error: error.message
        });
    }
};

module.exports = { addUser };

const getAllExamUser = async (req, res) => {
    console.log("Get All Exam User Endpoint hitted...")
    const eusers = await ExamUser.find({ email: { $exists: true } });
    console.log(eusers)

    if (eusers.length === 0) {
        console.log("No User Found in Database");
        return res.status(404).json({
            success: false,
            msg: "No User Found",
        });
    }
    return res.status(200).json(eusers);

};



const deleteAllExamUser = async (req, res) => {
    try {
        const result = await ExamUser.deleteMany({});
        console.log("Server Said " + `${result.deletedCount} documents deleted`);

        return res.status(200).json({
            success: true,
            msg: "Deleted Successfully",
            count: result.deletedCount,
        });
    } catch (error) {
        return error.res.status(400).json({
            success: true,
            msg: "Error in deleting",
            count: result.deletedCount,
        });

    }
};



const addQuestions = async (req, res) => {
    try {
        const questionsData = req.body.questions;
        console.log("Data====>", questionsData);



        const addedQuestions = await allquestions.insertMany(questionsData);

        return res.status(200).json({
            success: true,
            msg: "Questions Added Successfully",
            data: addedQuestions
        });
    } catch (error) {
        console.error('Error adding questions:', error);
        return res.status(400).json({
            success: false,
            msg: "Error in Adding Questions",
            error: error.message
        });
    }
};




const getAllQuestions = async (req, res) => {
    try {
        console.log("Get All Questions Endpoint hit...");

        const allQuestions = await allquestions.find({});

        if (allQuestions.length === 0) {
            console.log("No Questions Found in Database");
            return res.status(404).json({
                success: false,
                msg: "No Questions Found",
            });
        }

        return res.status(200).json({
            success: true,
            data: allQuestions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Error Retrieving Questions",
        });
    }
};


const deleteAllQuestions = async (req, res) => {
    try {
        const result = await allquestions.deleteMany({});
        console.log("Server Said " + `${result.deletedCount} documents deleted`);

        return res.status(200).json({
            success: true,
            msg: "Deleted Successfully",
            count: result.deletedCount,
        });
    } catch (error) {
        return error.res.status(400).json({
            success: true,
            msg: "Error in deleting",
            count: result.deletedCount,
        });

    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await ExamUser.findOne({ email, password });

        if (!user) {
            return res.status(404).json({ success: false, msg: 'Invalid email or password' });
        }

        return res.status(200).json({
            success: true,
            userDetails: {
                name: user.name,
                email: user.email,
                dob: user.dob,
                exams: user.exams
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

module.exports = { userLogin };




const getAllQuestionsWithExamName = async (req, res) => {
    try {
        console.log("Get exam questions Endpoint hit...");

        const { examName } = req.query;

        // Fetch 10 random questions from the database based on examName and userEmail
        const questions = await allquestions.aggregate([
            { $match: { examName: examName } },
            { $sample: { size: 10 } }
        ]);

        console.log(questions);

        if (questions.length === 0) {
            console.log(`No Questions Found for Exam: ${examName}`);
            return res.status(404).json({
                success: false,
                msg: `No Questions Found for Exam: ${examName}`,
            });
        }

        return res.status(200).json({
            success: true,
            data: questions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Error Retrieving Questions",
        });
    }
};

const submitExam = async (req, res) => {
    console.log("Submit Exam Hitted...");
    try {
        const { email, examName, results } = req.body;

        console.log('Received results:', results);

        // Find the user by email and ensure the exams array contains the specified exam
        const user = await ExamUser.findOne({ email, 'exams.examName': examName });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User or Exam not found',
            });
        }

        let correctAnswersCount = 0;

        // Process results to count correct answers and format results for storage
        const processedResults = results.map(result => {
            const selectedAnswer = result.selectedAnswer ? result.selectedAnswer : "NA";
            const isCorrect = selectedAnswer === result.correctAnswer;
            if (isCorrect) {
                correctAnswersCount++;
            }

            // Debugging each result
            console.log(`Question: ${result.question}`);
            console.log(`Selected Answer: ${selectedAnswer}`);
            console.log(`Correct Answer: ${result.correctAnswer}`);
            console.log(`Is Correct: ${isCorrect}`);

            return {
                question: result.question,
                selectedAnswer: selectedAnswer,
                correctAnswer: result.correctAnswer,
            };
        });

        // Debugging the count of correct answers
        console.log(`Correct Answers Count: ${correctAnswersCount}`);

        // Find the exam in the user's exams array and update it
        const examIndex = user.exams.findIndex(exam => exam.examName === examName);
        if (examIndex !== -1) {
            user.exams[examIndex].results = processedResults;
            user.exams[examIndex].examStatus = 'Completed';
            user.exams[examIndex].result = `${correctAnswersCount}/${results.length}`; // Dynamically set the total number of questions
        }

        await user.save();

        return res.status(200).json({
            success: true,
            msg: 'Exam submitted successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: 'Error submitting exam',
        });
    }
};


const SendResults = async (req, res) => {
    const { email, examName, score, estatus } = req.body;
  
    try {
      const msg = `Your exam status is now out for ${examName}.\nYou scored ${score}.\nYou are ${estatus} now.`;
  
      await mailer.sendMail(email, 'Online Exam Center', msg);
  
      return res.status(200).json({
        success: true,
        msg: 'Mail Sent Successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        msg: 'Error in Sending mail',
      });
    }
  };
  

module.exports = {
    addUser,
    getAllExamUser,
    deleteAllExamUser,
    addQuestions,
    getAllQuestions,
    deleteAllQuestions,
    userLogin,
    getAllQuestionsWithExamName,
    submitExam,
    SendResults,
};

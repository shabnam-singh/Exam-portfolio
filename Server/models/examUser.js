// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true
//     },
//     dob: {
//         type: Date,
//         required: true
//     },
//     password:{
//         type:String,
//     },
//     examName: {
//         type: String,
//         required: true,
//         enum: ['Java', 'Python', 'C', 'C++'] // Ensures the exam name is one of the specified options
//     },
//     examStatus:{
//         type:String,
//         default:"Not Completed"
//     },
//     result:{
//         type:String,
//         default:"None"
//     },

// }, {
//     timestamps: true // Automatically adds createdAt and updatedAt fields
// });


// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: false },
//     dob: { type: Date, required: true },
//     password: { type: String, required: true },
//     examName: { type: String, required: true },
//     examStatus: { type: String, default: 'Not Completed' },
//     result: { type: String, default: 'None' },
//     results: [
//         {
//             question: { type: String, required: true },
//             selectedAnswer: { type: String, required: true },
//             correctAnswer: { type: String, required: true },
//         }
//     ],
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('ExamUser', UserSchema);


const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    question: { type: String, required: true },
    selectedAnswer: { type: String, required: true },
    correctAnswer: { type: String, required: true }
});

const ExamSchema = new mongoose.Schema({
    examName: { type: String, required: true },
    examStatus: { type: String, default: 'Not Completed' },
    result: { type: String, default: 'None' },
    results: [ResultSchema]
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: false },
    dob: { type: Date, required: true },
    password: { type: String, required: true },
    exams: [ExamSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExamUser', UserSchema);

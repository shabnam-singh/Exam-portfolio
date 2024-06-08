const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    examName: {
        type: String,
        required: true,
        enum: ['Java', 'Python', 'C', 'C++'], // Ensures the exam name is one of the specified options
    },
    question: {
        type: String,
        required: true,
        trim: true,
    },
    options: {
        type: [String], // Changed to an array of strings
        required: true,
        trim: true,
        unique: false, // Allow duplicate values in the options array
    },
    correctAnswer: {
        type: String, // Assuming this should be a string
        required: true,
    },
   
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('allquestions', QuestionSchema);

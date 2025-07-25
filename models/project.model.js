const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tech: [{ type: String }], // An array of strings
    category: { type: String, required: true },
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
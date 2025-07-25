const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tech: [{ type: String, required: true }]
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);

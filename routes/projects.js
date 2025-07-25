const express = require('express');
const router = express.Router();
const Project = require('../models/project'); // Make sure this file exists and exports your mongoose model

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    console.log('📦 All projects fetched from database:', projects); // log data to server console
    res.json(projects); // send real data to frontend
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET project by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    console.log('📦 Single project fetched from database:', project);
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST create new project (for admin use)
router.post('/', async (req, res) => {
  try {
    const { title, description, category, tech, githubLink } = req.body;

    const newProject = new Project({
      title,
      description,
      category,
      tech,
      githubLink
    });

    const savedProject = await newProject.save();
    console.log('✅ New project saved to database:', savedProject);
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

module.exports = router;

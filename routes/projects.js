const express = require('express');
const router = express.Router();

// If you have a Project model, uncomment this:
// const Project = require('../models/Project');

// Sample projects data (remove this when you have real database)
const sampleProjects = [
  {
    _id: "1",
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with React frontend and Node.js backend, featuring user authentication, product catalog, shopping cart, and payment integration.",
    category: "Web Development",
    tech: ["React", "Node.js", "MongoDB", "Express", "Stripe"]
  },
  {
    _id: "2",
    title: "Mobile Banking App",
    description: "Cross-platform mobile banking application with secure authentication, account management, and transaction history.",
    category: "Mobile Development",
    tech: ["Flutter", "Firebase", "Dart", "REST APIs"]
  },
  {
    _id: "3",
    title: "Task Management System",
    description: "A collaborative task management platform with real-time updates, team collaboration features, and project tracking.",
    category: "Web Development",
    tech: ["React", "Python", "Django", "PostgreSQL", "WebSocket"]
  },
  {
    _id: "4",
    title: "Video Editing Tool",
    description: "Desktop application for video editing with timeline-based editing, effects, and export functionality.",
    category: "Desktop Development",
    tech: ["Electron", "JavaScript", "FFmpeg", "CSS3"]
  },
  {
    _id: "5",
    title: "Weather App",
    description: "Mobile weather application with location-based forecasts, weather alerts, and beautiful UI.",
    category: "Mobile Development",
    tech: ["Flutter", "OpenWeather API", "Dart", "GPS"]
  },
  {
    _id: "6",
    title: "Portfolio Website",
    description: "Responsive portfolio website with modern design, animations, and contact form integration.",
    category: "Web Development",
    tech: ["React", "Tailwind CSS", "Node.js", "MongoDB"]
  }
];

// GET all projects
router.get('/', async (req, res) => {
  try {
    // If you have MongoDB model, use this:
    // const projects = await Project.find();
    // res.json(projects);
    
    // For now, return sample data
    res.json(sampleProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET project by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // If you have MongoDB model, use this:
    // const project = await Project.findById(id);
    // if (!project) {
    //   return res.status(404).json({ error: 'Project not found' });
    // }
    // res.json(project);
    
    // For now, find in sample data
    const project = sampleProjects.find(p => p._id === id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST create new project (for admin use)
router.post('/', async (req, res) => {
  try {
    const { title, description, category, tech } = req.body;
    
    // If you have MongoDB model, use this:
    // const newProject = new Project({
    //   title,
    //   description,
    //   category,
    //   tech
    // });
    // const savedProject = await newProject.save();
    // res.status(201).json(savedProject);
    
    // For now, just return success
    res.status(201).json({ message: 'Project created successfully' });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

module.exports = router;
const Project = require("../models/project");
const asyncHanlder = require("express-async-handler");

// @desc Get all projects associated to user's email
// @route GET /api/projects/
const getProjects = asyncHanlder(async (req, res) => {
  const projects = await Project.find({ emails: req.user.email });
  res.status(200).json(projects);
});

// @desc Get specific project
// @route GET /api/projects/:id
const getProject = asyncHanlder(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  res.status(200).json(project);
});

// @desc Create new project
// @route POST /api/projects/
const createProject = asyncHanlder(async (req, res) => {
  const { name, description, emails, color } = req.body;
  if (!name || !description || !emails || !color ) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  const project = await Project.create({
    name,
    description,
    emails,
    color,
    user_id: req.user.id,
  });

  res.status(201).json(project);
});

// @desc Update existing project
// @route PUT /api/projects/:id
const updateProject = asyncHanlder(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  if (project.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user projects");
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProject);
});

// @desc Delete existing project
// @route DELETE /api/projects/:id
const deleteProject = asyncHanlder(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  if (project.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user projects");
  }
  await Project.deleteOne({ _id: req.params.id });
  res.status(200).json(project);
  res.status(200).json({
    message: `Deleted project ${req.params.id}`,
  });
});
module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};

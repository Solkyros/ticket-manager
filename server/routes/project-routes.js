const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project-controller");
// const cors = require("cors");
const validateToken = require("../../middleware/validate-token-handler");
// const port = process.env.PORT || 3001;
// router.use(
//   cors({
//     credentials: true,
//     origin: port,
//   })
// );
router.use(validateToken);
router.route("/").get(getProjects).post(createProject);
router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);


module.exports = router;

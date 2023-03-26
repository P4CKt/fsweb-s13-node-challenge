const express = require("express");
const server = express();
const projectRouter = require("./projects/projects-router");
// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!
server.use(express.json());
server.use("/api/projects", projectRouter);

module.exports = server;

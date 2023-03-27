// eylemlerle ilgili ara katman yazılımları yazın
const aModel = require("./actions-model");
const pModel = require("../projects/projects-model");

async function checkId(req, res, next) {
  try {
    const isExist = await aModel.get(req.params.id);
    if (!isExist) res.status(404).json({ message: "Action Not Found" });
    else {
      req.existAction = isExist;
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function checkPayloadAction(req, res, next) {
  try {
    const { project_id, description, notes } = req.body;
    let isExist = await pModel.get(project_id);
    let isValidateLength = description && description.length < 128;
    if (!isValidateLength || !notes || !isExist) {
      res.status(400).json({ message: "incorrect entry" });
    } else {
      req.actionPayload = {
        project_id: project_id,
        description: description,
        notes: notes,
        completed: req.body.completed,
      };
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { checkId, checkPayloadAction };

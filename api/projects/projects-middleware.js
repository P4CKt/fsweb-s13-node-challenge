// projects ara yazılımları buraya
const pModel = require("./projects-model");

async function checkId(req, res, next) {
  try {
    const isExist = await pModel.get(req.params.id);
    !isExist
      ? res.status(404).json({ message: "not found" })
      : ((req.projects = isExist), next());
  } catch (error) {
    next(error);
  }
}
async function checkPayload(req, res, next) {
  try {
    const { name, description, completed } = req.body;
    !name || !description
      ? res.status(400).json({ message: "there is a missing field." })
      : ((req.checkedPayload = {
          name: name,
          description: description,
          completed: completed,
        }),
        next());
  } catch (error) {
    next(error);
  }
}

module.exports = { checkId, checkPayload };

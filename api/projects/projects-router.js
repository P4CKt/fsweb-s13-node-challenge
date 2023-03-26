// "project" routerını buraya yazın!
// [+] `[GET] /api/projects`
//   - Yanıt gövdesinde bir projexts dizisi döndürür.
//   - Proje yoksa boş bir dizi ile yanıt verir.
// - [+] `[GET] /api/projects/:id`
//   - Yanıtın gövdesi olarak belirtilen "id" ile bir proje döndürür.
//   - Belirtilen id'ye sahip bir proje yoksa, 404 durum koduyla yanıt verir..
// - [ ] `[POST] /api/projects`
//   - Yanıtın gövdesi olarak yeni oluşturulan projeyi döndürür.
//   - İstek gövdesinde gerekli alanlardan herhangi biri eksikse, 400 durum koduyla yanıt verir.
// - [ ] `[PUT] /api/projects/:id`
//   - Yanıtın gövdesi olarak güncellenen projeyi döndürür.
//   - Belirtilen id'ye sahip bir proje yoksa, 404 durum koduyla yanıt verir.
//   - İstek gövdesinde gerekli alanlardan herhangi biri eksikse, 400 durum koduyla yanıt verir.
// - [ ] `[DELETE] /api/projects/:id`
//   - Yanıt gövdesi döndürmez.
//   - Belirtilen id'ye sahip bir proje yoksa, 404 durum koduyla yanıt verir..
// - [ ] `[GET] /api/projects/:id/actions`
//   - Belirtilen "id" ile bir projeye ait bir dizi eylem (boş olabilir) döndürür.
//   - Belirtilen id'ye sahip bir proje yoksa, 404 durum koduyla yanıt verir.

const express = require("express");
const {
  get,
  insert,
  update,
  remove,
  getProjectActions,
} = require("./projects-model");
const router = express.Router();
const { checkId, checkPayload } = require("./projects-middleware");

router.get("/", async (req, res, next) => {
  try {
    const projects = await get();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const projectsId = await get(req.params.id);
    !projectsId
      ? res.status(404).json({ message: "not found" })
      : res.json(projectsId);
  } catch (error) {
    next(error);
  }
});

router.post("/", checkPayload, async (req, res, next) => {
  try {
    let checkedPayload = await insert(req.checkedPayload);
    res.json(checkedPayload);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", checkId, checkPayload, async (req, res, next) => {
  try {
    const insertedProject = await update(req.params.id, req.checkedPayload);
    res.json(insertedProject);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", checkId, async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "deletion successful" });
  } catch (error) {
    next(error);
  }
});
router.get("/:id/actions", checkId, async (req, res, next) => {
  try {
    let result = await getProjectActions(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

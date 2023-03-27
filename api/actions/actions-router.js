// "eylem" routerını buraya yazın
const express = require("express");
const router = express.Router();
const { get, insert, update, remove } = require("./actions-model");
const { checkId, checkPayloadAction } = require("./actions-middlware");

// `api/actions/actions-router.js` içinde _actions_ CRUD işlemleri yapan uç noktalar oluşurun:

// - [+] `[GET] /api/actions`
//   - Yanıtın gövdesi olarak bir dizi eylem (action) (veya boş bir dizi) döndürür.
// - [+] `[GET] /api/actions/:id`
//   - Yanıtın gövdesi olarak verilen "id" ile bir action döndürür.
//   - Verilen 'id' ile herhangi bir eylem yoksa, 404 durum koduyla yanıt verir.
// - [+] `[POST] /api/actions`
//   - Yeni oluşturulan eylemi yanıtın gövdesi olarak döndürür.
//   - İstek gövdesinde gerekli alanlardan herhangi biri eksikse, 400 durum koduyla yanıt verir.
//   - Bir eylem eklerken sağlanan "project_id"nin mevcut bir "projeye" ait olduğundan emin olun.
// - [ ] `[PUT] /api/actions/:id`
//   - Güncellenen eylemi yanıtın gövdesi olarak döndürür.
//   - Verilen 'id' ile herhangi bir işlem yoksa, 404 durum koduyla yanıt verir.
//   - İstek gövdesinde gerekli alanlardan herhangi biri eksikse, 400 durum koduyla yanıt verir.
// - [ ] `[DELETE] /api/actions/:id`
//   - Yanıt gövdesi döndürmez.
//   - Verilen 'id' ile herhangi bir işlem yoksa, 404 durum koduyla yanıt verir.

router.get("/", async (req, res, next) => {
  try {
    let actions = await get();
    res.json(actions);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", checkId, async (req, res, next) => {
  try {
    res.json(req.existAction);
  } catch (error) {
    next(error);
  }
});
router.post("/", checkPayloadAction, async (req, res, next) => {
  try {
    let insertAction = await insert(req.actionPayload);
    res.json(insertAction);
  } catch (error) {
    next(error);
  }
});
router.put("/:id", checkId, checkPayloadAction, async (req, res, next) => {
  try {
    let updatedAction = await update(req.params.id, req.actionPayload);
    res.json(updatedAction);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", checkId, async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "deletion completed" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require("express");

const verifyToken = require("../middlewares/verifyToken");
const Firmctl = require("../Controllers/Firmctl");

const router = express.Router();

router.post("/addfirm", verifyToken, Firmctl.addFirm);

router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  req.headersSent("Content-type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});
router.delete("/:firmid", Firmctl.deletefirmid);
module.exports = router;

const express = require("express")

const parksControllers = require("../controllers/parks-controller")

const router = express.Router()

router.get("/:pid", parksControllers.getParkById)

router.get("/:user/:uid", parksControllers.getParkByUserId)

router.post("/", parksControllers.createPark)

router.patch("/:pid", parksControllers.updatePark)

router.delete("/:pid", parksControllers.deletePark)

module.exports = router
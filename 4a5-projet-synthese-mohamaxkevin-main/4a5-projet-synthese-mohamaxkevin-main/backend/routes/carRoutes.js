const express = require('express') ;
const router = express.Router() ;
const carController = require('../controllers/carController') ;
const checkAdminAuth = require('../middleWares/check-admin-auth') ;

router.get("/",carController.getCars) ;
router.get("/:cid", carController.getCarById) ;

//router.use(checkAdminAuth) ; // ADMIN
router.delete("/:cid", carController.deleteCar) ;
router.post("/", carController.addNewCar) ;

module.exports = router ;


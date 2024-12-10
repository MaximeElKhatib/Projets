const express = require('express') ;
const router  = express.Router() ;
const userController = require("../controllers/userController") ;
const checkAuth = require('../middleWares/check-auth') ;
const checkAdminAuth = require('../middleWares/check-admin-auth') ;

router.post("/login", userController.login) ;
router.post("/signup", userController.signUpUser) ;

router.use(checkAuth) ;

router.delete("/:uid", userController.deleteUser)
router.patch("/:uid", userController.updateUser) ;
router.get("/", userController.getUsers) ;
router.get("/:uid", userController.getUserById)

router.use(checkAdminAuth) ; // ADMIN






module.exports = router ;
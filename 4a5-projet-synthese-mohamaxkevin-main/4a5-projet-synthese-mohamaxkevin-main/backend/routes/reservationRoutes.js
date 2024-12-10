const express = require('express') ;
const reservationController = require('../controllers/reservationController') ;
const router = express.Router() ;
const checkAuth = require('../middleWares/check-auth') ;
const checkAdminAuth = require('../middleWares/check-admin-auth') ;

router.use(checkAuth) ;
router.post("/", reservationController.createReservation) ;
router.delete("/:rid", reservationController.deleteReservation) ;

router.use(checkAdminAuth) ; //ADMIN
router.get("/", reservationController.getReservations) ; 
router.get("/:rid" , reservationController.getReservationById) ;



module.exports = router ;
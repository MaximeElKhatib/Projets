const express = require('express') ;
const router = express.Router() ;
const succursaleController = require('../controllers/succursaleController') ;
const checkAuth = require('../middleWares/check-auth') ;
const checkAdminAuth = require('../middleWares/check-admin-auth') ;


router.get('/', succursaleController.getSuccursale) ;
router.get('/:sid', succursaleController.getSuccursaleById) ;

 router.use(checkAdminAuth)// ADMIN

router.delete('/:sid', succursaleController.deleteSuccursale) ;
router.patch('/:sid', succursaleController.updateSuccursale) ;
router.post('/:sid/cars', succursaleController.addCarToSuccursale) ;
router.delete('/:sid/cars', succursaleController.removeCarFromSuccursale) ;
router.post('/', succursaleController.addSuccursale) ;

module.exports = router ;

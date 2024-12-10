const express = require('express') ;
const router  = express.Router() ;
const reviewController = require('../controllers/reviewController') ;
const checkAuth = require('../middleWares/check-auth') ;

router.get("/", reviewController.getReviews) ;
router.get("/:rid", reviewController.getReviewById) ;

router.use(checkAuth) ;

router.post("/", reviewController.createReview) ;
router.delete("/:rid", reviewController.deleteReview) ;
router.patch("/:rid", reviewController.updateReview) ;

module.exports = router ;
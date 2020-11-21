/*
    path: api/all/:words
*/
const { Router } = require('express');
const { getSearchAll, getSearchCollection } = require('../controllers/search-controller');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();


router.get('/all/:words', validateJWT, getSearchAll);
router.get('/collection/:collection/:words', validateJWT, getSearchCollection);

module.exports = router;
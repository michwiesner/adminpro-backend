/*
    path: api/uploads/:type/:id
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, getFile } = require('../controllers/upload-controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();
router.use(expressFileUpload());

router.get('/:type/:name', getFile);

router.put('/:type/:id', validateJWT, fileUpload);

module.exports = router;
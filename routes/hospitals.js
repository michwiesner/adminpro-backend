/* 
 path: '/api/hospitals'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateValue } = require('../middlewares/validate-value');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getHospitals, postHospital, updateHospital, deleteHospital } = require('../controllers/hospital-controller');

const router = Router();

router.get('/', getHospitals);

router.post('/', [
        validateJWT,
        check('name', `Hospital's name required`).not().isEmpty(),
        validateValue
    ],
    postHospital);

router.put('/:id', [
    validateJWT,
    check('name', `Hospital's name required`).not().isEmpty(),
    validateValue
], updateHospital);

router.delete('/:id', validateJWT, deleteHospital);

module.exports = router;
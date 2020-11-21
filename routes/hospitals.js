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

router.put('/:id', [], updateHospital);

router.delete('/:id', deleteHospital);

module.exports = router;
/* 
 path: '/api/medicos'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateValue } = require('../middlewares/validate-value');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getMedicos, postMedico, updateMedico, deleteMedico } = require('../controllers/medico-controller');

const router = Router();

router.get('/', getMedicos);

router.post('/', [
        validateJWT,
        check('name', 'Medico name is required').not().isEmpty(),
        check('hospital', 'Hospital id must be valid').isMongoId(),
        validateValue
    ],
    postMedico);

router.put('/:id', [], updateMedico);

router.delete('/:id', deleteMedico);

module.exports = router;
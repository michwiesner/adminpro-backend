/* 
 path: /api/users
*/
const { Router } = require('express');
const { getUsers, postUser, updateUser, deleteUser } = require('../controllers/users-controller')
const { check } = require('express-validator');
const { validateValue } = require('../middlewares/validate-value');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/', validateJWT, getUsers);

router.post('/', [
        check('nombre', 'required').not().isEmpty(),
        check('password', 'required').not().isEmpty(),
        check('email', 'required').isEmail(),
        validateValue
    ],
    postUser);

router.put('/:id', [
    validateJWT,
    check('nombre', 'required').not().isEmpty(),
    check('email', 'required').isEmail(),
    check('role', 'required').not().isEmpty(),
    validateValue,
], updateUser);

router.delete('/:id', validateJWT, deleteUser);

module.exports = router;
// path: '/api/login'
const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken } = require('../controllers/auth-controller');
const { validateValue } = require('../middlewares/validate-value');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password required').not().isEmpty(),
    validateValue
], login);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
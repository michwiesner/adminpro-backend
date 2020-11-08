// path: '/api/login'
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth-controller');
const { validateValue } = require('../middlewares/validate-value');

const router = Router();

router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password required').not().isEmpty(),
    validateValue
], login);

module.exports = router;
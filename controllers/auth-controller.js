const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        // verify email
        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Some error happen in login'
            });
        }

        // verify password
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Some error happen in login'
            });
        }

        // generate jwt
        const token = await generateJWT(userDB.id);

        res.status(200).json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error login. Talk with the admin'
        });
    }
}

const renewToken = async(req, res = response) => {
    const id = req.id;

    // generate jwt
    const token = await generateJWT(id);

    res.json({
        ok: true,
        token
    });
}

module.exports = { login, renewToken };
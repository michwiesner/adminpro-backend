const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async(req, res = response) => {
    const desde = Number(req.query.desde) || 0;

    const [users, total] = await Promise.all([
        User.find({}, 'name email role google').skip(desde).limit(5),
        User.count()
    ]);

    res.json({
        ok: true,
        total,
        users
    });
}

const postUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'An error has happeneded'
            });
        }
        const user = new User(req.body);

        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        // generate jwt
        await user.save();
        const token = await generateJWT(user.uid);
        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error unespected'
        });
    }

}

const updateUser = async(req, res = response) => {
    // TODO validar token y si usuario correcto
    const id = req.params.id;

    try {

        const userDB = await User.findById(id);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }

        const { google, password, email, ...values } = req.body;
        if (userDB.email != email) {
            const emailExist = await User.findOne({ email });
            if (emailExist) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email error'
                })
            }
        }

        values.emai = email;
        const updatedUser = await User.findByIdAndUpdate(id, values, { new: true });

        res.json({
            ok: true,
            user: updatedUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Something bad happened'
        });
    }
}

const deleteUser = async(req, res = response) => {
    const id = req.params.id;

    try {
        const userDB = await User.findById(id);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }

        await User.findByIdAndDelete(id);
        return res.status(200).json({
            ok: true,
            msg: 'Deleting succesful'
        });

    } catch (error) {
        return res.status(200).json({
            ok: false,
            msg: 'Error deleting, check with admin'
        });

    }
}

module.exports = { getUsers, postUser, updateUser, deleteUser };
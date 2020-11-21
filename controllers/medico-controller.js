const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find().populate('user', 'name img').populate('hospital', 'name img');
    res.status(200).json({
        ok: true,
        medicos
    });
};

const postMedico = async(req, res = response) => {
    const uid = req.id;
    const medico = new Medico({
        user: uid,
        ...req.body
    });

    try {
        const medicoDB = await medico.save();
        return res.status(200).json({
            ok: true,
            msg: 'All ok',
            medico: medicoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something is not right, contact admin'
        })
    }
};

const updateMedico = async(req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'Todo ok'
    })
};

const deleteMedico = async(req, res = response) => {
    res.status(200).json({
        ok: true,
        msg: 'Todo ok'
    })
};

module.exports = {
    getMedicos,
    postMedico,
    updateMedico,
    deleteMedico
};
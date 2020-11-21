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
    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico not found'
            });
        }

        const updatedMedico = {
            ...req.body,
            user: req.id
        }
        await Medico.findByIdAndUpdate(id, updatedMedico, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'All updated',
            medico: updatedMedico
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Wrong information'
        });
    }
};

const deleteMedico = async(req, res = response) => {
    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico not found'
            });
        }

        await Medico.findByIdAndDelete(id);
        return res.status(200).json({
            ok: true,
            msg: 'Deleted succesfull'
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error deleting, check with admin'
        });

    }
};

module.exports = {
    getMedicos,
    postMedico,
    updateMedico,
    deleteMedico
};
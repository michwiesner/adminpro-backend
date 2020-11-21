const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async(req, res = response) => {
    const hospitals = await Hospital.find().populate('user', 'name img');
    res.json({
        ok: true,
        hospitals
    });

};

const postHospital = async(req, res = response) => {
    const uid = req.id;
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();
        return res.status(200).json({
            ok: true,
            msg: 'All ok',
            hospital: hospitalDB
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something is not right, contact admin'
        })
    }
};

const updateHospital = async(req, res = response) => {
    const id = req.params.id;

    try {
        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital not found'
            });
        }

        const updatedHospital = {
            ...req.body,
            user: req.id
        }
        await Hospital.findByIdAndUpdate(id, updatedHospital, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'All updated',
            hospital: updatedHospital
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Wrong information'
        });
    }

};

const deleteHospital = async(req, res = response) => {
    const id = req.params.id;

    try {
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital not found'
            });
        }

        await Hospital.findByIdAndDelete(id);
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
    getHospitals,
    postHospital,
    updateHospital,
    deleteHospital
};
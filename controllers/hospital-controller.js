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

};

const deleteHospital = async(req, res = response) => {

};

module.exports = {
    getHospitals,
    postHospital,
    updateHospital,
    deleteHospital
};
const { response } = require('express');
const user = require('../models/user');
const medico = require('../models/medico');
const hospital = require('../models/hospital');

const getSearchAll = async(req, res = response) => {
    const searchWords = req.params.words;
    const regex = new RegExp(searchWords, 'i');

    const [users, medicos, hospitals] = await Promise.all([
        user.find({ name: regex }),
        medico.find({ name: regex }),
        hospital.find({ name: regex })
    ]);
    res.json({
        ok: true,
        users,
        medicos,
        hospitals
    });
}

const getSearchCollection = async(req, res = response) => {
    const searchWords = req.params.words;
    const collection = req.params.collection;
    const regex = new RegExp(searchWords, 'i');

    let data = [];
    switch (collection) {
        case 'users':
            data = await user.find({ name: regex });

            break;
        case 'medicos':
            data = await medico.find({ name: regex })
                .populate('user', 'name img')
                .populate('hospital', 'name img');

            break;
        case 'hospitals':
            data = await hospital.find({ name: regex })
                .populate('user', 'name img');

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'No collection found'
            });
    }

    res.status(200).json({
        ok: true,
        results: data
    })

}

module.exports = { getSearchAll, getSearchCollection };
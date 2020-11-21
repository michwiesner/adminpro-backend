const fs = require('fs');
const user = require('../models/user');
const medico = require('../models/medico');
const hospital = require('../models/hospital');

const deletePreviousImg = (type, img) => {
    const oldPath = `./uploads/${type}/${ img }`;
    if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
    }
};

const actImage = async(type, id, fileName) => {
    switch (type) {
        case 'medicos':
            const medicoDB = await medico.findById(id);
            if (!medicoDB) {
                return false;
            }

            deletePreviousImg(type, medicoDB.img);

            medicoDB.img = fileName;
            await medicoDB.save();
            break;
        case 'users':
            const userDB = await user.findById(id);
            if (!userDB) {
                return false;
            }

            deletePreviousImg(type, userDB.img);

            userDB.img = fileName;
            await userDB.save();

            break;
        case 'hospitals':
            const hospitalDB = await hospital.findById(id);
            if (!hospitalDB) {
                return false;
            }

            deletePreviousImg(type, hospitalDB.img);

            hospitalDB.img = fileName;
            await hospitalDB.save();

            break;

        default:
            break;
    }
};

module.exports = { actImage };
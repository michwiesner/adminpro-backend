const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actImage } = require('../helpers/act-img');


const fileUpload = (req, res = response) => {
    const type = req.params.type;
    const id = req.params.id;

    const validType = ['hospitals', 'medicos', 'users'];
    if (!validType.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'Invalid type'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }

    const file = req.files.image;
    const splitName = file.name.split('.');
    const fileExtension = splitName[splitName.length - 1].toLowerCase();

    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    if (!validExtensions.includes(fileExtension)) {
        return res.status(400).json({
            ok: false,
            msg: 'Invalid file type'
        });
    }

    // Generate file name
    const fileName = `${ uuidv4() }.${ fileExtension }`;

    // Save file path
    const path = `./uploads/${ type }/${ fileName }`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error moving the file'
            });
        }

        res.json({
            ok: true,
            msg: 'file uploaded',
            fileName
        })
    });

    actImage(type, id, fileName);


}

const getFile = async(req, res = response) => {
    const type = req.params.type;
    const fileName = req.params.name;

    let pathFile = path.join(__dirname, `../uploads/${ type }/${ fileName }`);

    // default img
    if (!fs.existsSync(pathFile)) {
        pathFile = path.join(__dirname, `../uploads/no-img.jpg`);
    }

    res.sendFile(pathFile);

}

module.exports = { fileUpload, getFile };
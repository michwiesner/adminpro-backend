const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

    // read token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        req.id = id;
        console.log('jwt: ', id);

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })

    }
}

module.exports = { validateJWT };
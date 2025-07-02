const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

module.exports = function (req,res,next) {

    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')){
        return res.status(401).json({ error: 'Missing or Invalid Token' });
    }

    const token = auth.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        console.log("DECODED", decoded);
        next();
    }

    catch (err) {
        console.error(err);
        return res.status(401).json({ error: "Invalid Token" });
    }

}
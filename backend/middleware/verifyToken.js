import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'You are not Authenticated!',
        });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = payload.id;

        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is invalid' });
    }
};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const helper_1 = require("../utils/helper");
const userMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
            const user = (0, helper_1.verifyToken)(token);
            req.user = user;
            console.log(user);
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ status: 'fail', result: null, message: 'ok' });
        }
    }
    else {
        res.status(401).json({ status: 'fail', result: null, message: 'ok' });
    }
};
exports.userMiddleware = userMiddleware;

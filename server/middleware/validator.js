const {validations} = require("express-validator");
const {check, validationResult} = require('express-validator');
const {sanitizeBody} = require('express-validator');

// can be reused by many routes
const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(422).json({errors: errors.array()});
    };
};


module.exports = validate;

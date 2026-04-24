const { validationResult, matchedData } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        })
    }

    req.validated = {
        body: matchedData(req, { locations: ['body'] }),
        params: matchedData(req, { locations: ['params'] }),
        query: matchedData(req, { locations: ['query'] })
    }

    next();
}

module.exports = validate;

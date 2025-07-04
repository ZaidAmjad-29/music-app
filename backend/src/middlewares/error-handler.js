// file imports
const ErrorResponse = require('../utils/error-response');

const Error = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    console.log(err);

    if (err.name === 'CastError') {
        const message = `Resource not found with id ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((e) => e.message);
        const message = messages.join(', ');
        error = new ErrorResponse(message, 400);
    }

    // Duplicate value found
    if (err.code === 11000) {
        let field = Object.keys(err.keyPattern)[0];
        field = field.charAt(0).toUpperCase() + field.slice(1);
        const message = `${field} already used, try another one instead!`;
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
    });
};

module.exports = Error;

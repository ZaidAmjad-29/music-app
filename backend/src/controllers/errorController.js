module.exports = (err, req, res, next) => {
    // Set default values
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    
    res.status(err.statusCode).json({
      status: false,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { 
        error: err.name,
        stack: err.stack 
      })
    });
  };
function errorHandler(err, req, res, next) { 
  console.log("errorHandler")
    const status = err.status || 500;
    const response = {
      status,
      message: err.message,
    };
  
    if (err.errors) {
      response.errors = err.errors;
    }
  
    res.status(status).json(response);
  
}


module.exports = errorHandler 
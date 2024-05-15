function logger(req, res, next) { 
    console.log("ROUTE", req.path);
    console.log("METHOD", req.method);

    next();
}


module.exports = logger 

function errorHandler(err, req, res, next){
    const errStatus = err.status || 500;
    res.status(errStatus).json({
        message: err.message || "Internal Server Error",
        errorStatus: err.status
    });
}

module.exports = {errorHandler};
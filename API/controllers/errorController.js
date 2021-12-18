const errorHandler = 
    process.argv.some(arg => arg == 'nostack') ? 
        (err, req, res, next) => {
            err.statusCode = err.statusCode || 500;
            err.status = err.status || 'error';
            res.status(err.statusCode).json({
                status: err.status,
                error: err,
                message: err.message,
            });
        } : 
        (err, req, res, next) => {
            err.statusCode = err.statusCode || 500;
            err.status = err.status || 'error';
            res.status(err.statusCode).json({
                status: err.status,
                error: err,
                message: err.message,
                stack: err.stack
            });
        }
        
module.exports = errorHandler
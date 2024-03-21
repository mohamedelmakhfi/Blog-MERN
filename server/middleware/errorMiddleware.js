// Unsupported (404) routes
const notFound = (req, res, next) => {
  const error = new Error("Not found " + req.originalUrl);
  res.status(404);
  next(error);
};

// Middleware to handle Errors
const errorMiddleware = (error, req, res, next) => {
  if (res.headerSent) {   //id a response is already sent 
    return next(error);
  }
  res.status(error.code || 500).json({
    message: error.message || "An unknow error occured",
  });
};


module.exports = {notFound,errorMiddleware}
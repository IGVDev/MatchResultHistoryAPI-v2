const errorHandler = (req, res, next, err) => {
  if (err) {
    res.status(404).json({
      status: "fail",
      message: `Can't find ${req.originalUrl} on this server!`,
    });
    next(err);
  }
  //   const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  //   err.status = "fail";
  //   err.statusCode = 404;
};

module.exports = errorHandler;

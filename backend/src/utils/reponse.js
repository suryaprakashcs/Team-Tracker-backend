exports.successResponse = (res, message, data = {}, code = 200) => {
  return res.status(code).json({
    status: "success",
    message,
    data,
  });
};

exports.errorResponse = (res, message, error = {}, code = 500) => {
  return res.status(code).json({
    status: "error",
    message,
    error,
  });
};

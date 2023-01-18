const responseData = (status, message, error, datas) => {
  return {
    status,
    message,
    error,
    datas,
  };
};

module.exports = responseData;

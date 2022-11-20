module.exports = function (url, method) {
  const config = {
    method: method,
    url: url,
    headers: {},
  };
  return config;
};

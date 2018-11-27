const ip2countrify = require('ip2countrify');

module.exports = async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  ip2countrify.lookup(
    ip,
    (ip, results, error) => {
      if (error) {
        return res.end('An error has occurred: ' + error);
      }

      results.ip = ip;

      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(results));
    },
  );
};
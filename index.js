const ip2countrify = require('ip2countrify');

module.exports = (req, res) => {
  let reqIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (reqIP === '127.0.0.1') {
    reqIP = req.headers['x-real-ip'];
  }
 
  ip2countrify.lookup(
    reqIP,
    (ip, results, error) => {
      if (error) {
        return res.end('An error has occurred: ' + error);
      }

      results.ip = reqIP;

      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(results));
    },
  );
};
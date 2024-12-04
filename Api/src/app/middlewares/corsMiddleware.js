const FrontEndUrl = process.env.FRONT_END_URL;

module.exports =  (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', FrontEndUrl);
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
};
const models = require('../services/db');

const UrlModel = models.loadSchema('urls', {
  fields: {
    shortUrl: "text",
    longUrl: "text",
  },
  key: ['shortUrl'],
});

UrlModel.syncDB((err, result) => {
  if (err) throw err;
});

process.on('SIGTERM', () => models.close());
process.on('SIGTERM', () => models.close());

module.exports = UrlModel;

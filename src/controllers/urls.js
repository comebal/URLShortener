const { shorten, getLongUrl, getUrls, resetCounter } = require('../services/shortener');

const create = async (req, res) => {
  const { url } = req.body;

  const shortUrl = await shorten(url);

  res.json({ shortUrl });
}

const get = async (req, res) => {
  const { shortUrl } = req.params;

  const longUrl = await getLongUrl(shortUrl);

  if (!longUrl) {
    res.status(404).send('Not Found');
    return;
  }

  res.redirect(301, longUrl);
}

const getAll = async(req, res) => {
  res.json(await getUrls());
}

const reset = async(req, res) => {
  try {
    await resetCounter();
  } catch (e) {
    console.error(e);
  }

  res.json({});
}

module.exports = {
  create,
  get,
  getAll,
  reset,
};

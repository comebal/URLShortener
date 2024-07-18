const UrlModel = require("../models/urls");
const { getSeed, reset } = require('./counter');
const { encode } = require('./encoder');

const shorten = async (longUrl) => {
  const seed = await getSeed();
  const shortUrl = encode(seed);

  const url = new UrlModel({ shortUrl, longUrl });
  await url.saveAsync();

  return shortUrl;
}

const getLongUrl = async (shortUrl) => {
  const data = await UrlModel.findOneAsync({ shortUrl });

  if (!data) return null;

  const { longUrl } = data;

  return longUrl;
}

const getUrls = async() => {
  return UrlModel.findAsync({}, { raw: true });
}

const resetCounter = async () => {
  try {
    await reset();
  } catch (e) {
    console.log(e);
  }

  return Promise.resolve();
}

module.exports = {
  getLongUrl,
  getUrls,
  shorten,
  resetCounter,
};

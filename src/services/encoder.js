const {
  BASE62_MAPPING,
  ENCODER_PREFIX_BITS_COUNT,
  ENCODER_BITS_COUNT,
} = require("../config");

const prefixMax = Math.pow(2, ENCODER_PREFIX_BITS_COUNT);

const base62Encode = (n) => {
  let d = n;
  let hash = '';

  while (d > 0) {
    hash = BASE62_MAPPING[d % 62] + hash;
    d = Math.floor(d / 62);
  }

  return hash;
}

const encode = (str) => {
  const extras = Math.floor((Math.random() * prefixMax));

  const prefix = extras.toString(2).padStart(ENCODER_PREFIX_BITS_COUNT);
  const suffix = str.toString(2).padStart(ENCODER_BITS_COUNT, '0');

  const concatenated = `${prefix}${suffix}`;
  const n = parseInt(concatenated, 2);

  return base62Encode(n);
}

module.exports = {
  encode,
};

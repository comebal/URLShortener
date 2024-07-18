const {
  COUNTER_RANGE,
  ZOOKEEPER_CONNECTION_STRING,
  ZOOKEEPER_CONNECTION_PATH
} = require('../config');
const zookeeper = require('../lib/zookeeper');

const client = new zookeeper(ZOOKEEPER_CONNECTION_STRING, ZOOKEEPER_CONNECTION_PATH);

let counter = Infinity;
let max = 0;

const computeNewRange = (current) => {
  return [ current + 1, current + COUNTER_RANGE ];
}

const getNewRange = async () => {
  try {
    await client.connect();

    const counter = await client.readData() ?? 0;

    const [from, to] = computeNewRange(parseInt(counter, 10));

    await client.updateData(to.toString());

    return [from, to];
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
}

const getSeed = async () => {
  if (counter > max) {
    const [newCounter, newMax] = await getNewRange();
    counter = newCounter;
    max = newMax;
  }

  const currentCount = counter;
  counter += 1;

  return currentCount;
}

const reset = async() => {
  try {
    await client.connect();

    await client.delete();
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
}

module.exports = {
  getSeed,
  reset,
};

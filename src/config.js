const COUNTER_RANGE = 5;
const ENCODER_BITS_COUNT = 43;
const ENCODER_PREFIX_BITS_COUNT = 4;

// zookeeper
const ZOOKEEPER_CONNECTION_STRING = "localhost:2181";
const ZOOKEEPER_CONNECTION_PATH = "/config";

// cassandra
// const CASSANDRA_HOST = 'cassandra';
const CASSANDRA_HOST = 'localhost';

// [0-9A-Za-z] characters with positions randomized
const BASE62_MAPPING = 'zIVmKy8vQxd0WJq1ZreR45CnHjUca20SiMDhfAuFO9XtLog3YGkTE6lPbB7pws';

module.exports  = {
  BASE62_MAPPING,
  CASSANDRA_HOST,
  COUNTER_RANGE,
  ENCODER_BITS_COUNT,
  ENCODER_PREFIX_BITS_COUNT,
  ZOOKEEPER_CONNECTION_STRING,
  ZOOKEEPER_CONNECTION_PATH,
};

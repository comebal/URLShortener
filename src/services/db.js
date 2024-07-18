const cassandra = require('express-cassandra');
const { CASSANDRA_HOST } = require('../config');

const models = cassandra.createClient({
  clientOptions: {
    contactPoints: [CASSANDRA_HOST],
    localDataCenter: 'datacenter1',
    keyspace: 'shortener',
    protocolOptions: { port: 9042 },
    socketOptions: { readTimeout: 60000 },
  },
  ormOptions: {
    defaultReplicationStrategy : {
      class: 'SimpleStrategy',
      replication_factor: 1
    },
    migration: 'safe',
  },
});

module.exports = models;

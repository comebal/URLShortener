const zookeeper = require('node-zookeeper-client');

// Async Utility functions
const createNode = async (
  client,
  nodePath,
  data = null,
  acl = zookeeper.ACL.OPEN_ACL_UNSAFE,
  createMode = zookeeper.CreateMode.EPHEMERAL,
) => {
  return new Promise((resolve, reject) => {
    client.create(nodePath, data, acl, createMode, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

const deleteNode = async (client, nodePath) => {
  return new Promise((resolve, reject) => {
    client.remove(nodePath, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

const getNodeData = async (client, nodePath) => {
  return new Promise((resolve, reject) => {
    client.getData(nodePath, null, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}

const setNodeData = async (client, nodePath, data) => {
  return new Promise((resolve, reject) => {
    client.setData(nodePath, Buffer.from(data), -1, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}

// Implement Shared Data update using locks
class Zookeeper {
  constructor(connectionString, path) {
    this.connectionString = connectionString;

    this.path = path;
    this.lockPath = `${path}-lock`;
    this.client = null;
    this.data = null;
  }

  getClient() {
    if (!this.client) {
      this.client  = zookeeper.createClient(this.connectionString);
    }

    return this.client;
  }

  async connect() {
    const client = this.getClient();

    return new Promise((resolve, reject) => {
      client.once('connected', (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });

      client.connect();
    });
  }

  async acquireLock() {
    const client = this.getClient();

    return createNode(client, this.lockPath);
  }

  async releaseLock() {
    const client = this.getClient();

    return deleteNode(client, this.lockPath);
  }

  async createDataNode() {
    const client = this.getClient();

    return createNode(
      client,
      this.path,
      null,
      zookeeper.ACL.OPEN_ACL_UNSAFE,
      zookeeper.CreateMode.PERSISTENT,
    );
  }

  async readData() {
    const client = this.getClient();

    if (!this.data) {
      try {
        await this.createDataNode();
      } catch (e) {
        // config node already exists
      }

      try {
        this.data = await getNodeData(client, this.path);
      } catch (e) {
        this.data = null;
      }
    }

    return this.data;
  }

  async updateData(newData) {
    const client = this.getClient();

    await this.acquireLock();

    try {
      this.data = await setNodeData(client, this.path, newData);
    } catch (err) {
      throw err;
    } finally {
      await this.releaseLock();
    }
  }

  async delete() {
    const client = this.getClient();

    return deleteNode(client, this.path);
  }

  close() {
    if (this.client) {
      this.client.close();
      this.client = null;
    }
  }
}

module.exports = Zookeeper;

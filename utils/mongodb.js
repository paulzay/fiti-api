const { MongoClient } = require('mongodb');

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'fitness-tracker';

const uri = `mongodb://${host}:${port}`;

class Database {
  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(database);
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to the database');
    } catch (err) {
      console.error(err);
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      console.log('Disconnected from the database');
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new Database();

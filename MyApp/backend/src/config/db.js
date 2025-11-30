import 'dotenv/config';
import { Client,types } from "pg";
import fs from "fs";

types.setTypeParser(23, val => parseInt(val, 10));
types.setTypeParser(20, val => parseInt(val, 10));
types.setTypeParser(1700, val => parseFloat(val));

const client = new Client({ connectionString: process.env.DB_URL, ssl: { ca: fs.readFileSync('./ca/ca.pem').toString(), rejectUnauthorized: true } })
client.connect()
    .then(() => console.log('Connected to Aiven PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

export default client;

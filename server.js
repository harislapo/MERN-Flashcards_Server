import express from 'express';
import { MongoClient } from 'mongodb';

const dbURL =
  'mongodb+srv://animals-admin:n66wmx2iZGksz4kL@cluster0.j9iahrw.mongodb.net/animals-testing?retryWrites=true&w=majority';
let db;

const app = express();

app.get('/', async (req, res) => {
  const allAnimals = await db.collection('animals').find().toArray();
  res.send(
    `<h1>Welcome to the page</h1> ${allAnimals
      .map((animal) => `<p>${animal.name} - ${animal.species}</p>`)
      .join('')}`
  );
});

app.get('/admin', (req, res) => {
  res.send('This is the admin page!');
});

const start = async () => {
  const client = new MongoClient(dbURL);
  await client.connect();
  db = client.db();
  app.listen(3000);
};

start();

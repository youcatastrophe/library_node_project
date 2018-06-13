const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const books = [
  {
    title: 'Holy Bible',
    genre: 'Religion',
    author: 'God',
    read: true
  },
  {
    title: 'The Lord of the Rings Trilogy',
    genre: 'Fantasy',
    author: 'J.R.R. Tolkien',
    read: true
  },
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Miserables',
    genre: 'Historical Ficiton',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'Of Mice and Men',
    author: 'John Steinbeck',
    genre: 'Novella',
    read: false
  }
];

function router() {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Successfully connected to Mongo Server');

          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;

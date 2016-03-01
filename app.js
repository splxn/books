'use strict';

var fs = require('fs');
var Q = require('q');

var promises = [];

function getBooks(file) {
  promises.push(new Promise((resolve, reject) => {
    fs.readFile(file, function (err, file) {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(file));
      });
    }
  ).then((books) => {
    books.forEach(function (item) {
      item.year = Math.floor(Math.random() * 16 + 2000);
    });
    return books;
  }));
}

function getAuthors(file) {
  promises.push(new Promise((resolve, reject) => {
    fs.readFile(file, (err, file) => {
      if (err) {
        reject(err);
        return;
      }
        resolve(JSON.parse(file));
      });
    }
  ).then((authors) => {
    authors.forEach((item) => {
      item.year = Math.floor(Math.random() * 100 + 1900);
    });
    return authors;
  }))
}

function getIds(file) {
  promises.push(new Promise((resolve, reject) => {
    fs.readFile(file, function (err, file) {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(file));
    });
  }));
}

getBooks('books.json');
getAuthors('authors.json');
getIds('booksAuthors.json');

Q.all(promises)
  .then(resolve => {
    var books = resolve[0];
    var authors = resolve[1];
    var ids = resolve[2];
    console.log(authors);
    ids.forEach(function(item) {
      var temp = authors[item.authorId].firstName + ' ' +
        authors[item.authorId].lastName;
      books[item.bookId].author = temp;
    })
    console.log(books);
  })
  .catch((err) => {
    console.log(err)
  });
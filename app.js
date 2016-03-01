'use strict';

var fs = require('fs');

function processBooks() {

  function readFile(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, body) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(body);
      })
    })
  }

  function parseFile(body) {
    try {
      return JSON.parse(body);
    } catch(err) {
      throw new Error('Unable to parse books.json');
    }
  }

  function processFile(list) {
    return list.map((item) => {
      item.year = Math.floor(Math.random() * 16 + 2000);
      return item;
    });
  }

  return readFile('books.json')
    .then(parseFile)
    .then(processFile)
    .catch(function (err) {
      throw new Error('Cannot find books.json');
    })
}

function processAuthors() {
  function readFile(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, body) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(body);
      })
    })
  }

  function parseFile(body) {
    try {
      return JSON.parse(body);
    } catch(err) {
      throw new Error('Unable to parse authors.json');
    }
  }

  function processFile(list) {
    return list.map((item) => {
      item.dateOfBirth = Math.floor(Math.random() * 100 + 1900);
      return item;
    });
  }

  return readFile('authors.json')
    .then(parseFile)
    .then(processFile)
    .catch(function (err) {
      throw new Error('Cannot find authors.json');
    })
}

function processBooksAuthors() {
  function readFile(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, body) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(body);
      })
    })
  }

  function parseFile(body) {
    try {
      return JSON.parse(body);
    } catch(err) {
      throw new Error('Unable to parse authorsBooks.json');
    }
  }

  return readFile('booksAuthors.json')
    .then(parseFile)
    .catch(function (err) {
      throw new Error('Cannot find authorBooks.json');
    })
}

Promise.all([processBooks(), processAuthors(), processBooksAuthors()])
  .then(resolve => {

    var books = resolve[0];
    var authors = resolve[1];
    var ids = resolve[2];

    books.forEach((book) => {

      var temp = ids.filter((bookAuthor) => {
        return book.id == bookAuthor.bookId;
      });

      var author = [];
      for (var i = 0; i < temp.length; i++) {
        for (var j = 0; j < authors.length; j++) {
          if (temp[i]['authorId'] == authors[j]['id']) {
            author.push(authors[j].firstName + ' ' + authors[j].lastName);
          }
        }
      }
      book['authors'] = author;
    })
    return books;
  })
  .then((books) => {
    console.log(JSON.stringify(books, null, 2));
  })
  .catch((err) => {
    console.log(err.stack);
  });

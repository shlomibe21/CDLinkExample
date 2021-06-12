"use strict";

const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "./client")));

// Run the server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Your app is listening on port ${port}`);
// });

// Both runServer and closeServer need to access the same
// server object, so we declare `server` here, and then when
// runServer runs, it assigns a value.
let server;

function runServer() {
  const port = process.env.PORT || 3000;
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// `server.close` does not return a promise on its own, so we manually
// create one.
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log("Closing server");
    server.close((err) => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

// If server.js is called directly, this block runs.
// We also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch((err) => console.error(err));
}

module.exports = { app, runServer, closeServer };

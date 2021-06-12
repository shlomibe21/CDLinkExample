"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../index");

const should = chai.should();
chai.use(chaiHttp);

describe("Server API", function () {
  // before(function () {
  //   return runServer();
  // });
  // after(function () {
  //   return closeServer();
  // });

  it("should returns status code 200 on GET requests", function () {
    return chai
      .request(app)
      .get("/")
      .then(function (res) {
        res.should.have.status(200);
      });
  });
});

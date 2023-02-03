// const { signup } = require("../controllers/authControllers");
const dotenv = require("dotenv");
dotenv.config();
const request = require("supertest");
// const express = require("express");
const mongoose = require("mongoose");
const app = require("../app");
const { User } = require("../models/user");
mongoose.set("strictQuery", false);

describe("signup test", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.HOST_URI);
    console.log();
  });
  afterAll(async () => {
    await mongoose.disconnect(process.env.HOST_URI);
  });
  it("should register new user", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "test4@mail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toStrictEqual({
      email: "test4@mail.com",
      subscription: "starter",
    });
    expect(response.body.token).not.toBe("");
  });
});

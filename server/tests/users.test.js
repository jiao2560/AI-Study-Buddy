const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("../routes/userRoutes");

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User API Full Coverage", () => {
  let userId;
  let token;

  it("should fail to register with missing fields", async () => {
    const res = await request(app).post("/api/users/register").send({});
    expect(res.statusCode).toBe(400);
  });

  it("should register a user", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: "user100",
      email: "user100@example.com",
      password: "test1234"
    });
    expect(res.statusCode).toBe(201);
  });

  it("should fail to register with duplicate email", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: "user101",
      email: "user100@example.com",
      password: "test1234"
    });
    expect(res.statusCode).toBe(400);
  });

  it("should fail login with missing fields", async () => {
    const res = await request(app).post("/api/users/login").send({});
    expect(res.statusCode).toBe(400);
  });

  it("should login user", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "user100@example.com",
      password: "test1234"
    });
    expect(res.statusCode).toBe(200);
    token = res.body.token;
    userId = res.body.userId;
  });

  it("should fail login with wrong password", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "user100@example.com",
      password: "wrongpass"
    });
    expect(res.statusCode).toBe(400);
  });

  it("should get user profile", async () => {
    const res = await request(app).get(`/api/users/profile/${userId}`);
    expect(res.statusCode).toBe(200);
  });

  it("should fail to get non-existing profile", async () => {
    const res = await request(app).get(`/api/users/profile/000000000000000000000000`);
    expect(res.statusCode).toBe(404);
  });

  it("should update user profile", async () => {
    const res = await request(app).put(`/api/users/${userId}`).send({ username: "updated" });
    expect(res.statusCode).toBe(200);
  });

  it("should delete user", async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
  });

  it("should fail to delete non-existing user", async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toBe(404);
  });
});

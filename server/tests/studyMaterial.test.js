const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const studyMaterialRoutes = require("../routes/studyMaterialRoutes");
const userRoutes = require("../routes/userRoutes");

const app = express();
app.use(express.json());
app.use("/api/studyMaterials", studyMaterialRoutes);
app.use("/api/users", userRoutes); // needed to register/login test user

let testUserId;
let testToken;
let testMaterialId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Register test user
  const registerRes = await request(app)
    .post("/api/users/register")
    .send({
      username: "testuser",
      email: "testuser@example.com",
      password: "testpassword",
    });

  testUserId = registerRes.body._id;

  // Login test user to get token
  const loginRes = await request(app)
    .post("/api/users/login")
    .send({
      email: "testuser@example.com",
      password: "testpassword",
    });

  testToken = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Study Materials API", () => {
  it("should fail to create material without token", async () => {
    const res = await request(app).post("/api/studyMaterials").send({
      title: "No Token",
      content: "This should fail",
    });
    expect(res.statusCode).toBe(401); // Unauthorized
  });

  it("should create a material", async () => {
    const res = await request(app)
      .post("/api/studyMaterials")
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        title: "React Basics",
        content: "JSX, components, hooks",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    testMaterialId = res.body._id;
  });

  it("should fetch all materials", async () => {
    const res = await request(app).get("/api/studyMaterials");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a material", async () => {
    const res = await request(app)
      .put(`/api/studyMaterials/${testMaterialId}`)
      .set("Authorization", `Bearer ${testToken}`)
      .send({ title: "Updated Title" });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Title");
  });

  it("should fail update for invalid id", async () => {
    const res = await request(app)
      .put(`/api/studyMaterials/000000000000000000000000`)
      .set("Authorization", `Bearer ${testToken}`)
      .send({ title: "Invalid" });

    expect(res.statusCode).toBe(404);
  });

  it("should delete the material", async () => {
    const res = await request(app)
      .delete(`/api/studyMaterials/${testMaterialId}`)
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.statusCode).toBe(200);
  });

  it("should fail to delete already deleted material", async () => {
    const res = await request(app)
      .delete(`/api/studyMaterials/${testMaterialId}`)
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.statusCode).toBe(404);
  });
});

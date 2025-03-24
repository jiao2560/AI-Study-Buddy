const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const studyMaterialRoutes = require("../routes/studyMaterialRoutes");

const app = express();
app.use(express.json());
app.use("/api/studyMaterials", studyMaterialRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Study Materials API", () => {
  let id;

  it("should fail with missing fields", async () => {
    const res = await request(app).post("/api/studyMaterials").send({});
    expect(res.statusCode).toBe(400);
  });

  it("should create material", async () => {
    const res = await request(app).post("/api/studyMaterials").send({
      title: "React Basics",
      content: "JSX, components, hooks"
    });
    expect(res.statusCode).toBe(201);
    id = res.body._id;
  });

  it("should fetch all materials", async () => {
    const res = await request(app).get("/api/studyMaterials");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update material", async () => {
    const res = await request(app).put(`/api/studyMaterials/${id}`).send({ title: "Updated Title" });
    expect(res.statusCode).toBe(200);
  });

  it("should fail update for invalid id", async () => {
    const res = await request(app).put(`/api/studyMaterials/000000000000000000000000`).send({ title: "Fail" });
    expect(res.statusCode).toBe(404);
  });

  it("should delete material", async () => {
    const res = await request(app).delete(`/api/studyMaterials/${id}`);
    expect(res.statusCode).toBe(200);
  });

  it("should fail delete for invalid id", async () => {
    const res = await request(app).delete(`/api/studyMaterials/${id}`);
    expect(res.statusCode).toBe(404);
  });
});

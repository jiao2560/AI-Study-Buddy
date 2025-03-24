const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const quizRoutes = require("../routes/quizRoutes");

const app = express();
app.use(express.json());
app.use("/api/quizzes", quizRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Quiz API", () => {
  let quizId;

  it("should fail to create quiz without fields", async () => {
    const res = await request(app).post("/api/quizzes").send({});
    expect(res.statusCode).toBe(400);
  });

  it("should create quiz", async () => {
    const res = await request(app).post("/api/quizzes").send({
      study_material_id: "000000000000000000000001",
      questions: [{
        question_text: "What is 2+2?",
        options: ["3", "4"],
        correct_answer: "4"
      }]
    });
    expect(res.statusCode).toBe(201);
    quizId = res.body._id;
  });

  it("should fetch all quizzes", async () => {
    const res = await request(app).get("/api/quizzes");
    expect(res.statusCode).toBe(200);
  });

  it("should update quiz", async () => {
    const res = await request(app).put(`/api/quizzes/${quizId}`).send({
      questions: [{
        question_text: "What is 1+1?",
        options: ["2"],
        correct_answer: "2"
      }]
    });
    expect(res.statusCode).toBe(200);
  });

  it("should fail to update non-existing quiz", async () => {
    const res = await request(app).put(`/api/quizzes/000000000000000000000000`).send({});
    expect(res.statusCode).toBe(404);
  });

  it("should delete quiz", async () => {
    const res = await request(app).delete(`/api/quizzes/${quizId}`);
    expect(res.statusCode).toBe(200);
  });

  it("should fail to delete again", async () => {
    const res = await request(app).delete(`/api/quizzes/${quizId}`);
    expect(res.statusCode).toBe(404);
  });
});

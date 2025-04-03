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
    const res = await request(app)
      .post("/api/quizzes")
      .send({
        study_material_id: "000000000000000000000001",
        questions: [
          {
            question_text: "What is 2+2?",
            options: ["3", "4"],
            correct_answer: "4",
          },
        ],
      });
    expect(res.statusCode).toBe(201);
    quizId = res.body._id;
  });

  it("should fetch all quizzes", async () => {
    const res = await request(app).get("/api/quizzes");
    expect(res.statusCode).toBe(200);
  });

  it("should update quiz", async () => {
    const res = await request(app)
      .put(`/api/quizzes/${quizId}`)
      .send({
        questions: [
          {
            question_text: "What is 1+1?",
            options: ["2"],
            correct_answer: "2",
          },
        ],
      });
    expect(res.statusCode).toBe(200);
  });

  it("should fail to update non-existing quiz", async () => {
    const res = await request(app)
      .put(`/api/quizzes/000000000000000000000000`)
      .send({});
    expect(res.statusCode).toBe(404);
  });

  it("should fetch quiz by study_material_id", async () => {
    const res = await request(app).get(
      "/api/quizzes?study_material_id=000000000000000000000001"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.study_material_id).toBe("000000000000000000000001");
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

it("should upsert (update) quiz with same study_material_id", async () => {
  const res = await request(app)
    .post("/api/quizzes")
    .send({
      study_material_id: "000000000000000000000001",
      questions: [
        {
          question_text: "What is 3+3?",
          options: ["5", "6"],
          correct_answer: "6",
        },
      ],
    });
  expect(res.statusCode).toBe(201);
  expect(res.body.questions[0].question_text).toBe("What is 3+3?");
});

it("should recreate quiz then fetch by study_material_id", async () => {
  await request(app)
    .post("/api/quizzes")
    .send({
      study_material_id: "000000000000000000000001",
      questions: [
        {
          question_text: "What is 5+5?",
          options: ["9", "10"],
          correct_answer: "10",
        },
      ],
    });

  const res = await request(app).get(
    "/api/quizzes?study_material_id=000000000000000000000001"
  );
  expect(res.statusCode).toBe(200);
  expect(res.body.study_material_id).toBe("000000000000000000000001");
});

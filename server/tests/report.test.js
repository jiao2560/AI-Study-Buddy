const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const reportRoutes = require("../routes/adminReportRoutes");

const app = express();
app.use(express.json());
app.use("/api/reports", reportRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Reports API", () => {
  let reportId;

  it("should fail with missing fields", async () => {
    const res = await request(app).post("/api/reports").send({});
    expect(res.statusCode).toBe(400);
  });

  it("should create a report", async () => {
    const res = await request(app).post("/api/reports").send({
      study_material_id: "000000000000000000000002",
      reason: "Inappropriate content",
      flagged_by: "000000000000000000000003"
    });
    expect(res.statusCode).toBe(201);
    reportId = res.body._id;
  });

  it("should get all reports", async () => {
    const res = await request(app).get("/api/reports");
    expect(res.statusCode).toBe(200);
  });

  it("should update report", async () => {
    const res = await request(app).put(`/api/reports/${reportId}`).send({
      status: "reviewed"
    });
    expect(res.statusCode).toBe(200);
  });

  it("should fail to update non-existing report", async () => {
    const res = await request(app).put(`/api/reports/000000000000000000000000`).send({
      status: "ignored"
    });
    expect(res.statusCode).toBe(404);
  });

  it("should delete report", async () => {
    const res = await request(app).delete(`/api/reports/${reportId}`);
    expect(res.statusCode).toBe(200);
  });

  it("should fail to delete already deleted report", async () => {
    const res = await request(app).delete(`/api/reports/${reportId}`);
    expect(res.statusCode).toBe(404);
  });
});

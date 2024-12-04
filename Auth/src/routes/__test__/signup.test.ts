import request from "supertest";
import { app } from "../../app";

describe("Signin", () => {
  it("returns a 201 on successful signup", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
  }, 10000);

  it("returns a 400 with an invalid password", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "h",
      })
      .expect(400);
  }, 10000);

  it("returns a 400 with an invalid email ", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "dfdfdcom",
        password: "password",
      })
      .expect(400);
  }, 10000);
  it("disallows duplicate emails", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(400);
  }, 10000);

  it("sets a cookie after successfully signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
    expect(response.get("Set-Cookie")).toBeDefined();
  }, 10000);
});

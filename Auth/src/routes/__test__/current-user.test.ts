import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/setup";

describe("test current user route", () => {
  it("responds with details about the current user", async () => {
    const cookie = await signin();

    const response = await request(app)
      .post("/api/users/signout")
      .set("Cookie", cookie!)
      .send({})
      .expect(200);

    expect(response.body.currentUser.email).toEqual("test@test.com");
  });

  it("response with null if not authenticated", async () => {
    const response = await request(app)
      .get("api/users/currentuser")
      .send()
      .expect(200);
    expect(response.body.currentUser).toEqual(null);
  });
});

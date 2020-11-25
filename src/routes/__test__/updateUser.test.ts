import request from "supertest"
import { app } from "../../app"

it("Updates the user name successfully and return status 203", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      id: "r1",
      name: "Test",
      email: "test@test.com",
      send_newsletter: true,
      reddits: [],
    })
    .expect(201)

  await request(app)
    .post("/api/users/update")
    .send({
      id: "r1",
      name: "test1",
    })
    .expect(203)
})

it("Throws 400 bad request if email is tried to update", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      id: "r1",
      name: "Test",
      email: "test@test.com",
      send_newsletter: true,
      reddits: [],
    })
    .expect(201)

  await request(app)
    .post("/api/users/update")
    .send({
      id: "r1",
      email: "test1@test.com",
    })
    .expect(400)
})

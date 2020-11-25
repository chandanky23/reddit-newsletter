import { app } from "../../app"
import request from "supertest"

it("returns 201 on successfull addition of user", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      id: "r1",
      name: "Test",
      email: "test@test.com",
      send_newsletter: true,
      reddits: [],
    })
    .expect(201)
})

it("returns a 400 status code with an invalid email", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      id: "r1",
      name: "Test",
      email: "test.com",
      send_newsletter: true,
      reddits: [],
    })
    .expect(400)
})

it("returns a 400 status code with an empty id", () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      id: "",
      name: "Test",
      email: "test@test.com",
      send_newsletter: true,
      reddits: [],
    })
    .expect(400)
})

it("not allows duplicate emails", async () => {
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
    .post("/api/users/signup")
    .send({
      id: "r2",
      name: "Test",
      email: "test@test.com",
      send_newsletter: true,
      reddits: [],
    })
    .expect(400)
})

import request from "supertest"
import { app } from "../../app"

it("Add the new reddit subscription to users reddits set and return 203 status", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      id: "r1",
      name: "Test",
      email: "test@test.com",
      send_newsletter: true,
      reddits: [
        {
          name: "politics",
          url: "r/politics",
        },
      ],
    })
    .expect(201)

  await request(app)
    .post("/api/users/subscribe")
    .send({
      id: "r1",
      reddit: {
        name: "PS5",
        url: "r/PS5",
      },
    })
    .expect(203)
})


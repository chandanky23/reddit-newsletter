import { app } from '../../app'
import request from 'supertest'

it("gets all the available sub reddits from reddits server", () => {
  return request(app).get("/api/reddits").expect(200)
})
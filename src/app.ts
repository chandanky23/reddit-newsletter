import express from "express"
import "express-async-errors"
import { json } from "body-parser"
import { userRouter } from "./routes/getUsersRouter"
import { signupUserRouter } from "./routes/signupUserRouter"
import { updateUserRouter } from "./routes/updateUserRouter"
import { deleteUserRouter } from "./routes/deleteUserRouter"
import { subscribeRedditRouter } from "./routes/subscribeRedditRouter"
import { redditRouter } from "./routes/getRedditsRouter"
import { NotFoundError } from "./errors/not-found-error"
import { errorHandler } from "./middlewares/error-handler"

const app = express()
app.use(json())

app.use(userRouter)
app.use(signupUserRouter)
app.use(updateUserRouter)
app.use(deleteUserRouter)
app.use(subscribeRedditRouter)
app.use(redditRouter)

app.all("*", async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }

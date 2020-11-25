import dotenv from "dotenv"
import express from "express"
import "express-async-errors"
import { json } from "body-parser"
import ejs from "ejs"
import path from "path"
import { userRouter } from "./routes/getUsersRouter"
import { signupUserRouter } from "./routes/signupUserRouter"
import { updateUserRouter } from "./routes/updateUserRouter"
import { deleteUserRouter } from "./routes/deleteUserRouter"
import { subscribeRedditRouter } from "./routes/subscribeRedditRouter"
import { redditRouter } from "./routes/getRedditsRouter"
import { NotFoundError } from "./errors/not-found-error"
import { errorHandler } from "./middlewares/error-handler"
import { sendNewsLetter } from "./services/sendNewsLetter"
import cron from "node-cron"

const app = express()
app.use(json())
dotenv.config()

app.set("views", path.join(__dirname, "views"))
app.engine("html", ejs.renderFile)
app.set("view engine", "html")

app.use(userRouter)
app.use(signupUserRouter)
app.use(updateUserRouter)
app.use(deleteUserRouter)
app.use(subscribeRedditRouter)
app.use(redditRouter)

cron.schedule('0 8 * * *', () => {
  console.log('Running a job at everyday 8 am for America Denver and Europe Berlin Timezones')
  sendNewsLetter()
}, {
  scheduled: true,
  timezone: "Europe/Berlin" || "America/Denver"
});

app.all("*", async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }

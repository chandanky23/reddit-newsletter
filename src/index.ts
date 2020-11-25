import { app } from "./app"
import { init } from "./utils/storage"

const PORT = 4000

app.listen(PORT, async () => {
  await init()
  console.log(`Server started at PORT: ${PORT}`)
})

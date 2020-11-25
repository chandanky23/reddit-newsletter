import express, { Request, Response } from "express"
import { getItem, STORAGE_KEYS } from "../utils/storage"
import { User } from "../types"

const router = express.Router()

/**
 * Get all the users
 */
router.get("/api/users", async (req: Request, res: Response) => {
  const users: User = await getItem(STORAGE_KEYS.DB_USERS)
  res.status(200).send(users)
})


export { router as userRouter }

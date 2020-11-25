import express, { Request, Response } from "express"
import { body } from "express-validator"
import { getItem, STORAGE_KEYS, setItem } from "../utils/storage"
import { User } from "../types"
import { NotFoundError } from "../errors/not-found-error"
import { validateRequest } from "../middlewares/validate-request"

const router = express.Router()

/**
 * Subscribe / Unsubscribe a reddit channel
 */
router.post(
  "/api/users/subscribe",
  [body("id").notEmpty().withMessage("id is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const users: User[] = await getItem(STORAGE_KEYS.DB_USERS)
    const { reddits, id } = req.body
    
    const matchingUser = users.filter((u) => u.id === id)
    if (!matchingUser.length) {
      throw new NotFoundError()
    }

    const updatedUsers = users.map((u) => {
      if (u.id === id) {
        u.reddits = reddits
      }
      return u
    })
    await setItem(STORAGE_KEYS.DB_USERS, updatedUsers)

    res.status(203).send({
      message: `${matchingUser[0].name}'s reddits subscription successfully updated`,
    })
  }
)

export { router as subscribeRedditRouter }

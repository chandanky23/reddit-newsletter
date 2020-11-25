import express, { Request, Response } from "express"
import { body } from "express-validator"
import { getItem, STORAGE_KEYS, setItem } from "../utils/storage"
import { User } from "../types"
import { validateRequest } from "../middlewares/validate-request"
import { NotFoundError } from "../errors/not-found-error"

const router = express.Router()

/**
 * Update an existing user
 */
router.post(
  "/api/users/update",
  [
    body("id").notEmpty().withMessage("id is required"),
    body("email").isEmpty().withMessage("Email cannot be changed"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const users: User[] = await getItem(STORAGE_KEYS.DB_USERS)

    const { id } = req.body
    const matchingUser = users.filter((u) => u.id === id)

    if (!matchingUser.length) {
      throw new NotFoundError()
    }

    const updatedUsers = users.map((u) => {
      if (u.id === id) {
        u.name = req.body.name || u.name
        u.send_newsletter = req.body.send_newsletter || u.send_newsletter
        u.reddits = req.body.reddits || u.reddits
      }
      return u
    })
    setItem(STORAGE_KEYS.DB_USERS, updatedUsers)
    res.status(203).send({
      message: `${matchingUser[0].name}'s data successfully updated`,
    })
  }
)

export { router as updateUserRouter }

import express, { Request, Response } from "express"
import { body } from "express-validator"
import { getItem, STORAGE_KEYS, setItem } from "../utils/storage"
import { User } from "../types"
import { validateRequest } from "../middlewares/validate-request"
import { NotFoundError } from "../errors/not-found-error"

const router = express.Router()

/**
 * Delete a user
 */
router.post(
  "/api/users/delete",
  [body("id").notEmpty().withMessage("id is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const users: User[] = await getItem(STORAGE_KEYS.DB_USERS)

    const { id } = req.body
    const matchingUser = users.filter((u) => u.id === id)

    if (!matchingUser.length) {
      throw new NotFoundError()
    }

    const updatedUsers = users.filter((u) => u.id !== id)
    await setItem(STORAGE_KEYS.DB_USERS, updatedUsers)
    res.status(201).send({
      message: `${matchingUser[0].name} successfully removed from database`,
    })
  }
)

export { router as deleteUserRouter }

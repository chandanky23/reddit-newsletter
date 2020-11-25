import express, { Request, Response } from "express"
import { body } from "express-validator"
import { getItem, STORAGE_KEYS, setItem } from "../utils/storage"
import { User } from "../types"
import { validateRequest } from "../middlewares/validate-request"
import { BadRequestError } from "../errors/bad-request-error"

const router = express.Router()

/**
 * Add a new user
 */
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("id").notEmpty().withMessage("id is mandatory"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, email, id, send_newsletter, reddits } = req.body
    const users: User[] = await getItem(STORAGE_KEYS.DB_USERS)

    const matchingUser = users.filter((u) => u.email === email)
    if (matchingUser.length) {
      throw new BadRequestError("User already exists")
    }

    const updatedUsers = [
      ...users,
      {
        id,
        name: name || "",
        email,
        send_newsletter: send_newsletter || false,
        reddits: reddits || [],
      },
    ]
    await setItem(STORAGE_KEYS.DB_USERS, updatedUsers)
    res.status(201).send(req.body)
  }
)

export { router as signupUserRouter }

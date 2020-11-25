import express, { Request, Response } from "express"
import { ALL_REDDITS_URL } from "../vars"
import axios from "axios"
import { Reddits } from "../types"
import { ConnectionError } from "../errors/connection-error"

const router = express.Router()

/**
 * Method to get the list of all the reddits display name and their prefixed url value
 */
router.get("/api/reddits", async (req: Request, res: Response) => {
  let reddits: Reddits[] = []
  try {
    const response = await axios.get(ALL_REDDITS_URL)
    const listing = await response.data.data.children
    listing.forEach((r: any) => {
      reddits.push({
        title: r.data.title,
        display_name: r.data.display_name,
        display_name_prefixed: r.data.display_name_prefixed,
      })
    })
  } catch (err) {
    console.error(err)
    throw new ConnectionError()
  }

  res.status(200).send(reddits)
})

export { router as redditRouter }

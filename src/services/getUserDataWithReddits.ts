import { User } from "../types"
import { getItem, STORAGE_KEYS } from "../utils/storage"
import { SUB_REDDIT_BASE_URL, SORT_TYPE } from "../vars"
// import { createPDF } from "./htmlToPdf"

export const userDataWithReddits = async (top3SubReddits: any) => {
  const userData = []

  const users: User[] = await getItem(STORAGE_KEYS.DB_USERS)

  for (let i of users) {
    let obj = {
      name: i.name,
      email: i.email,
      send_newsletter: i.send_newsletter,
      subreddits: [] as any,
    }
    if (i.reddits) {
      i.reddits.forEach((r) => {
        obj.subreddits.push({
          name: r.name,
          url: `${SUB_REDDIT_BASE_URL}${r.url}/${SORT_TYPE}`,
          data: top3SubReddits[r.url],
        })
      })
    }
    userData.push(obj)
  }
  return userData
}

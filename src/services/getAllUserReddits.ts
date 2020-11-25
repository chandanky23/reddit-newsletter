import { User } from "../types"
import { getItem, STORAGE_KEYS } from "../utils/storage"

export const getAllUserReddits = async () => {
  const all_reddits: any[] = []
  const top3SubReddits: any = {}
  const users: User[] = await getItem(STORAGE_KEYS.DB_USERS)
  for (let i of users) {
    if (i.reddits) {
      i.reddits.map(async (r) => {
        if (!all_reddits.includes(r.url)) {
          all_reddits.push(r.url)
          top3SubReddits[r.url as any] = []
        }
      })
    }
  }
  return { all_reddits, top3SubReddits }
}

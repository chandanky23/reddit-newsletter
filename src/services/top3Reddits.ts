import axios from "axios"
import { SUB_REDDIT_BASE_URL, SORT_TYPE, LIMIT } from "../vars"

export const top3Reddits = async (all_reddits: any[], top3SubReddits: any) => {
  for (const val of all_reddits) {
    try {
      const response = await axios.get(
        `${SUB_REDDIT_BASE_URL}${val}.json?sort=${SORT_TYPE}&limit=${LIMIT}`
      )
      const data = await response.data.data.children
      const limit = data.length < LIMIT ? data.length : LIMIT
      let i = 0
      while (i < limit) {
        top3SubReddits[val].push({
          title: data[i].data.title,
          image: data[i].data.thumbnail ? data[i].data.thumbnail : null,
          votes: `${Math.round((data[i].data.score * 100.0) / 1000) / 100}k`,
          subRedditName: data[i].data.subreddit,
        })
        i++
      }
    } catch (err) {
      throw err
    }
  }
  return top3SubReddits
}

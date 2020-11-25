import { getAllUserReddits } from "./getAllUserReddits"
import { top3Reddits } from "./top3Reddits"
import { userDataWithReddits } from "./getUserDataWithReddits"
import { createPDF } from "./htmlToPdf"
import { sendEmail } from "./sendEmail"

export const sendNewsLetter = async () => {
  const { all_reddits, top3SubReddits: topReddits } = await getAllUserReddits()
  const top3SubReddits = await top3Reddits(all_reddits, topReddits)
  const userWithReddits = await userDataWithReddits(top3SubReddits)

  // Create PDF and send Email
  userWithReddits.forEach((user) => {
    if (user.send_newsletter) {
      createPDF(user)
      setTimeout(() => sendEmail(user), 5000)
    }
  })
}

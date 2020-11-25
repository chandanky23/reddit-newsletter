import sgMail from "@sendgrid/mail"
import path from "path"
import fs from "fs"

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export const sendEmail = (user: any) => {
  try {
    const attachment = fs
      .readFileSync(path.join(__dirname, `../newsletters/${user.email}.pdf`))
      .toString("base64")

    const msg = {
      to: user.email,
      from: process.env.EMAIL_FROM!,
      subject: "Reddit Newsletter",
      text: "Your daily Reddit Newsletter",
      attachments: [
        {
          content: attachment,
          filename: "reddit_newsletter.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent")
      })
      .catch((error) => {
        console.error(error)
        throw error
      })
  } catch (err) {
    console.error("OOPS!!!")
    return "try_again"
  }
}

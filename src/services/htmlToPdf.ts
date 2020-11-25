import pdf, { CreateOptions } from "html-pdf"
import ejs from "ejs"
import path from "path"
import { sendEmail } from "./sendEmail"

let options: CreateOptions = { format: "Letter" }

export const createPDF = (data: any) => {
  ejs
    .renderFile(path.join(__dirname, "../views/newsletter.html"), {
      reddits: data.subreddits,
      name: data.name.split(" ")[0],
    })
    .then((response) => {
      response
      pdf
        .create(response, options)
        .toFile(
          path.join(__dirname, `../newsletters/${data.email}.pdf`),
          (err, res) => {
            if (err) {
              return console.log(err)
            }
            console.log(res)
          }
        )
    })
    .catch((err) => {
      console.error(err)
    })
}

export interface User {
  id: string
  name: string
  email: string
  send_newsletter: boolean
  reddits: {
    name: string
    url: string
  }[]
}

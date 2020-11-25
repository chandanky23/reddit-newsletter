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

export interface Reddits {
  title: string
  display_name: string
  display_name_prefixed: string
}

export interface SubReddits {
  title: string
  image: string
  votes: number
  subRedditName: string
}

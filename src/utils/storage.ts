import storage from "node-persist"
import { User } from '../types'

export enum STORAGE_KEYS {
  DB_USERS = "users",
}

export const init = async () => {
  await storage.init()
  await storage.setItem(STORAGE_KEYS.DB_USERS, [])
}

export const getItem = async (key: string) => {
  const item = await storage.getItem(key)
  return item ? item : []
}

export const setItem = async (key: string, val?: User[]) => {
  await storage.setItem(key, val)
}

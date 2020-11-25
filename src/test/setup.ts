import { init, delItem, STORAGE_KEYS, clear } from "../utils/storage"

/**
 * Create a temporary database in memeory using node-persist
 */
beforeAll(async () => {
  await init()
})

// Delete all the data, i.e collections created in cache after each test.
beforeEach(async () => {
  await delItem(STORAGE_KEYS.DB_USERS)
})

// Delete the entire filesystem in the cache after all the test
afterAll(async () => {
  clear()
})


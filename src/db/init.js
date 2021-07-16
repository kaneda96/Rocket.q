const database = require('./config')

const initDB = {
  async init() {
    const db = await database()

    await db.exec(`
    CREATE TABLE ROOMS (
      id INTEGER PRIMARY KEY,
      pass TEXT
    )
    `)

    await db.exec(`
    CREATE TABLE QUESTIONS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      read INTEGER,
      room INTEGER,
      enabled INTEGER
    )
    `)
    await db.close()
  }
}

initDB.init()

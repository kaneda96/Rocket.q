const Database = require('../db/config')

module.exports = {
  index(req, res) {
    const { room: roomId, question: questionId, slug } = req.params
    const { password } = req.body

    console.log(
      `room = ${roomId} | question = ${questionId} | slug = ${slug} | password = ${password}`
    )
  },

  async update(req, res) {
    const db = await Database()
    const { room, question, slug } = req.params
    const { password } = req.body

    const verifyPassword = await db.get(
      `SELECT ID, PASS FROM ROOMS WHERE ID = ${room} AND PASS = "${password}"`
    )

    console.log(verifyPassword)

    if (verifyPassword === undefined) {
      return res.status('401').json({ error: 'wrong password' })
    }

    if (slug === 'check') {
      db.exec(`UPDATE QUESTIONS SET read = 1 WHERE id = ${question}`)
    }

    if (slug === 'uncheck') {
      db.exec(`UPDATE QUESTIONS SET read = 0 WHERE id = ${question}`)
    }

    if (slug === 'delete') {
      db.exec(`UPDATE QUESTIONS SET ENABLED = 0 WHERE id = ${question}`)
    }

    db.close()
    res.redirect(`/room/${room}`)
  },

  async create(req, res) {
    const db = await Database()
    const { question } = req.body
    const { room } = req.params

    db.run(
      `INSERT INTO QUESTIONS( TITLE, ROOM, READ, ENABLED) VALUES ("${question}" , ${room} , 0, 1)`
    )

    db.close()

    res.redirect(`/room/${room}`)
  },

  async disable(req, res) {
    const db = await Database()
    const { question } = req.params

    db.close()
    res.redirect(`/room/${room}`)
  },

  async read(req, res) {},

  async unread(req, res) {}
}

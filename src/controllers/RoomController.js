const database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await database()
    const { password } = req.body
    let roomExists = true
    let roomId = 0

    while (roomExists) {
      roomId = Math.floor(100000 + Math.random() * 900000)

      roomExists =
        (await db.get('SELECT id from ROOMS where id = ?', [roomId])) !=
        undefined

      console.log(roomExists, roomId, await db.all('SELECT id from ROOMS'))
    }

    await db.run(`INSERT INTO ROOMS (id,pass) VALUES (${roomId},${password})`)

    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    const db = await database()
    const { room } = req.params
    const { password: infomedPassword } = req.body

    const roomSearch = await db.get(
      'SELECT id , pass from ROOMS where id = ?',
      [room]
    )

    if (roomSearch) {
      const { id, password } = roomSearch

      if (password !== infomedPassword) {
        res.send
      }

      const questionsUnread = await db.all(
        `SELECT id, title, read from questions where room = ${id} and read = 0 and enabled = 1`
      )

      const questionsRead = await db.all(
        `SELECT id, title, read from questions where room = ${id} and read = 1 and enabled = 1`
      )

      const noQuestion =
        questionsRead.length == 0 && questionsUnread.length == 0 ? true : false

      res.render('room', {
        roomId: id,
        questionsRead,
        questionsUnread,
        noQuestion
      })
    } else {
      res.redirect('/')
    }
  },

  async enter(req, res) {
    const { room } = req.body
    console.log(room)
    res.redirect(`/room/${room}`)
  }
}

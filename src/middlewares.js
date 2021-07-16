const database = require('../db/config')

module.exports = {
  VerifyPassword(req, res) {
    const { room } = req.params
    const { password } = req.body

    const db = database()

    return res.status('401').json({ error: 'Wrong password!' })
  }
}

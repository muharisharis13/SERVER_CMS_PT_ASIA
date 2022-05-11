const generator = require('generate-unique-id')

exports.id = generator({
  length: 5,
  useNumbers: true,
  useLetters: false
})

exports.idMath =+ Math.floor(Math.random() * 10000)

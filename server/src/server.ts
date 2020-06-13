import express from 'express'

const app = express()

app.get('/users', (request, response) => {
  console.log('Listagem de usuários')

  response.json([
    'Hállex',
    'Hállan',
    'Diego',
    'Deschamps',
    'Montano'
  ])
})

app.listen(3333)

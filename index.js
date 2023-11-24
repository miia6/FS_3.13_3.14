const express = require('express')
const app = express()

//const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')

/*morgan.token('postData', (req) => {
    return JSON.stringify(req.body)
})*/

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const requestTime = new Date()
    const message = `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${requestTime}</p>`
    response.send(message)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    Person.findById(id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    /*Person.findByIdAndRemove(id).then(() => {
        response.status(204).end()
    })*/
})

app.post('/api/persons', (request, response) => {

    const body = request.body

    if (!body || !body.name || !body.number) {
        return response.status(400).json({error: 'name or number is missing'})
    } 

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


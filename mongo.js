const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length < 5) {
    console.log('Missing arguments')
    process.exit(1)
} else {

    const password = process.argv[2]

    const url = `mongodb+srv://miiakoskentalo:${password}@cluster0.dpkvzxg.mongodb.net/phonebookApp?retryWrites=true&w=majority`

    mongoose.set('strictQuery',false)
    mongoose.connect(url)
        
    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })
      
    const Person = mongoose.model('Person', personSchema)
    
    if (process.argv.length === 3) {
        Person.find({}).then(result => {
            console.log("phonebook:")
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
    } else if (process.argv.length === 5) {

        const newName = process.argv[3]
        const newNumber = process.argv[4]
        const person = new Person({
            name: newName, 
            number: newNumber,
        })

        /*
        person.save().then(result => {
            console.log(`added ${person.name} number ${person.number} to notebook`)
            mongoose.connection.close()
        })
        */
    }
}



/* Idea inicial en javascript, antes de Yargs
const command = process.argv[2]; 
if (command === 'add') {
    console.log('Adding note!')
} else if (command === 'remove') {
    console.log('Removing note!')
}
*/


const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Versión de Yargs a usar
yargs.version('1.1.0')


// Definiendo comandos con handler y builder

// Comando add
yargs.command({
    command: 'add',
    describe: 'Agrega una nueva nota ',
    builder: {
        title: {
            describe: 'Título de la nota',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Contenido de la nota',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        // console.log('Agregando una nueva nota!')
        notes.addNote(argv.title, argv.body)
    }
})


// Comando remove
yargs.command({
    command: 'remove',
    describe: 'Elimina una nota dando su título',
    builder: {
        title: {
            describe: 'Título de la nota',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        //console.log('Eliminando una nota!')
        notes.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'Listado de notas registradas en notes.json',
    handler() {
        notes.listNotes()
    }
})

// Comando read
yargs.command({
    command: 'read',
    describe: 'consultar una nota. Escribe el título y te dará el contenido. Escribe app list para conocer el listado de títulos',
    builder: {
        title: {
            describe: 'título de la nota',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

//console.log(yargs.argv)
yargs.parse()
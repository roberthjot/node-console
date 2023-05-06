require('colors')

const { guardarDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
    } = require('./helpers/inquirer');
const { pause } = require('./helpers/mensajes');
const Tareas = require('./models/tareas');


console.clear()

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    do {
        // imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear opcon
                const desc = await leerInput('Descipción: ');
                tareas.crearTarea(desc)
            break;
            case '2':
                console.log(tareas.listadoArr)
            break;
    
        }

        // guardarDB( tareas.listadoArr );

        await pause();

    } while( opt !== '0' )

    // pause();

}

main();
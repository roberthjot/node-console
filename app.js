require('colors')

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
    } = require('./helpers/inquirer');
const { pause } = require('./helpers/mensajes');
const Tareas = require('./models/tareas');


console.clear()

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if ( tareasDB ) { // Cargar tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

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
                tareas.listadoCompleto();
            break;

            case '3': // listadas completadas
                tareas.listarPendientesCompletadas(true);
            break;

            case '4': // listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5': // Completado | pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;

            case '6': // Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0' ) {
                    const ok = await confirmar('Esta seguro?');

                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada')
                    }
                }
                
            break;
    
        }

        guardarDB( tareas.listadoArr );

        await pause();

    } while( opt !== '0' )

    // pause();

}

main();
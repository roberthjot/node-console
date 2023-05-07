const Tarea = require("./tarea");

class Tareas {

    _listado = {
        abc: 123
    };

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;

    }

    constructor(){
        this._listado = {}
    }

    borrarTarea( id = '' ) {

        if(this._listado[id] ) {
            delete this._listado[id];
        }

    }

    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( Tarea => {
            this._listado[Tarea.id] = Tarea;
        });

    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {
    
        console.log();
        this.listadoArr.forEach( ( tarea, i ) => {

            const idx = `${i + 1}`.green;
            const { desc, compleatadoEn } = tarea;

            const estado = ( compleatadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado }`)

        });

    }

    listarPendientesCompletadas( completadas = true ) {

        console.log();
        let contador = 0;
        this.listadoArr.forEach( ( tarea ) => {

            const { desc, compleatadoEn } = tarea;

            const estado = ( compleatadoEn )
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            if ( completadas ) {
                contador += 1;
                if ( completadas ) {
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ compleatadoEn }`)
                }
            } else {
                // Mostrar pendientes
                if ( !compleatadoEn ) {
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`)
                }
            }

        });

    }

}

module.exports = Tareas;
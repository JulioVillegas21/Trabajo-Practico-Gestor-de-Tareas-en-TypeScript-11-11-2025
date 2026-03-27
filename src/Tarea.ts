import promptSync from "prompt-sync";//esm
const prompt = promptSync();//esm

export interface Tarea{
    titulo: string , 
    descripcion: string ,
    estado: string ,
    dificultad: string ,
    fechaCreacion: Date ,
    fechavencimiento: Date | null ,
    fechaultimaEdicion: Date ,
};

export function mostrarse(Tarea:Tarea):string{

    return `Titulo: ${Tarea.titulo} \n Descripcion: ${Tarea.descripcion} \n Estado: ${Tarea.estado} \n Dificultad: ${Tarea.dificultad} \n Fecha de Creacion: ${Tarea.fechaCreacion} \n Fecha de Vencimiento: ${Tarea.fechavencimiento} \n Fecha de Ultima Edicion: ${Tarea.fechaultimaEdicion}`;

}
export function crearTarea(titulo:string,descripcion:string,dificultad:string,vencimiento:Date|null):Tarea{
    const ahora= new Date();
    const tarea={
        titulo: titulo,
        descripcion: descripcion,
        dificultad: dificultad || "facil",//si no se ingresa dificultad queda en 1
        estado: "pendiente",//estado por deafult
        fechaCreacion:ahora,
        fechavencimiento: vencimiento || null,//si hay algo se pone sino queda null
        fechaultimaEdicion: ahora
    }
    return tarea;
}

export function mostrarTitulo(tarea:Tarea):string{
    return `Titulo: ${tarea.titulo}`;
}
export function agregarTarea(tareas:Tarea[], nuevaTarea:Tarea):Tarea[]{
    return [...tareas, nuevaTarea];
}

/**
 * Edita una tarea identificada por su título (case-insensitive) y devuelve
 * una nueva lista de tareas con la tarea actualizada (puro, no muta el array original).
 * `cambios` es un Partial<Tarea> con los campos a reemplazar. Fecha de última edición se actualiza.
 */
export function editarTarea(tareas: Tarea,Estados:string[],Dificultad:any):void {
    const nuevaDescripcion = prompt("Nueva descripcion (enter para mantener): ");
    if(nuevaDescripcion.trim()!==""){
        tareas.descripcion=nuevaDescripcion;
    }
    const nuevoEstado = prompt("Ingrese opcion de estado(1-4)) o deje en blanco para mantener: ");
    if(nuevoEstado.trim()!==""){
        if(Estados[parseInt(nuevoEstado)-1]){
            tareas.estado=Estados[parseInt(nuevoEstado)-1];
        }else{
            console.log("Estado invalido, se queda en el que ya estaba");
        }
    }
    const nuevaDificultad = prompt("Ingrese opcion de dificultad (1-3) o deje en blanco para mantener: ");
    if(nuevaDificultad.trim()!==""){
        if(Dificultad[parseInt(nuevaDificultad)]){
            tareas.dificultad=Dificultad[parseInt(nuevaDificultad)];
        }else{
            console.log("Dificultad invalida, se queda en la que ya estaba");
        }
    }
    tareas.fechaultimaEdicion=new Date();
}

/**
 * Edita la tarea ubicada en el índice `pos` y devuelve una nueva lista.
 * Esta versión evita re-buscar por título: recibe la posición ya conocida.
 */
export function editarTareaPorIndice(tareas: Tarea[], pos: number, cambios: Partial<Tarea>): Tarea[] {
    if (pos < 0 || pos >= tareas.length) return tareas;
    const ahora = new Date();
    const tareaActual = tareas[pos];
    const tareaEditada: Tarea = { ...tareaActual, ...cambios, fechaultimaEdicion: ahora };
    return [...tareas.slice(0, pos), tareaEditada, ...tareas.slice(pos + 1)];
}

export function recibirDato(Dificultades:any):Tarea{
    let titulo:string=prompt("Ingrese el titulo de la tarea: ");
    while(titulo==""){//verifica que el titulo no este vacio
        console.log("El titulo no puede estar vacio.");
        titulo=prompt("Ingrese el titulo de la tarea: ");
    }
    let descripcion:string=prompt("Ingrese la descripcion de la tarea(opcional): ");
    let dificultad:string=prompt("Ingrese la dificultad de la tarea ([1]facil,[2] medio,[3] dificil)(opcional): ");
    if(dificultad!=""){
        while(isNaN(parseInt(dificultad)) || parseInt(dificultad)<1 || parseInt(dificultad)>3){
            console.log("Dificultad invalida.");
            dificultad=prompt("Ingrese la dificultad de la tarea ([1]facil,[2] medio,[3] dificil)(opcional): ");
        }
    }
    let vencimiento1:string=prompt("Ingrese la fecha de vencimiento de la tarea (YYYY-MM-DD) o deje en blanco si no tiene: ");
    let vencimiento:Date|null=null;
    if(vencimiento1.trim()!==""){

        vencimiento=new Date(vencimiento1);
    }
    return crearTarea(titulo,descripcion,Dificultades[parseInt(dificultad)-1],vencimiento);
}

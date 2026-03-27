import { mostrarse, agregarTarea, mostrarTitulo, recibirDato, editarTarea } from './Tarea.js';
import { menuEstados, menu } from './Menus.js';
import { FiltrarEstados } from './funciones.js';
import promptSync from "prompt-sync"; //esm
const prompt = promptSync(); //esm
function main() {
    let tareas = [];
    const Dificultad = { 1: "facil", 2: "medio", 3: "dificil" };
    const Estados = ["pendiente", "en progreso", "terminada", "cancelada"];
    let n;
    do {
        console.log(menu());
        switch (n = parseInt(prompt("Ingrese una opcion: "))) {
            case 1:
                let nuevaTarea = recibirDato(Dificultad);
                tareas = agregarTarea(tareas, nuevaTarea);
                console.log("Tarea creada exitosamente.");
                break;
            case 2:
                // Filtrado por estado, mostrar lista y permitir elegir una para editar
                if (tareas.length === 0) {
                    console.log("No hay tareas para mostrar.");
                }
                else {
                    console.log(menuEstados());
                    let selEstado = parseInt(prompt("Seleccione estado (1-4): "));
                    while (isNaN(selEstado) || selEstado < 1 || selEstado > 4) {
                        console.log("Seleccion invalida.");
                        selEstado = parseInt(prompt("Seleccione estado (1-4): "));
                    }
                    if (selEstado === 4) {
                        tareas.forEach((t, i) => {
                            console.log(i + "." + mostrarTitulo(t));
                        });
                    }
                    else {
                        const filtradas = FiltrarEstados(tareas, Estados, selEstado);
                        if (filtradas.length === 0) {
                            console.log("No hay tareas con ese estado.");
                            break;
                        }
                        else {
                            console.log("Tareas encontradas:");
                            filtradas.forEach((t, pos) => {
                                console.log(`[${pos + 1}] Estado: ${t.estado} - ${t.titulo}`);
                            });
                        }
                        let elegir = parseInt(prompt("Ingrese el numero de la tarea para ver/editar (0 para volver): "));
                        while (isNaN(elegir) || elegir < 0 || elegir > filtradas.length) {
                            console.log("Seleccion invalida.");
                            elegir = parseInt(prompt("Ingrese el numero de la tarea para ver/editar (0 para volver): "));
                        }
                        if (elegir === 0)
                            break;
                        let seleccionado = filtradas[elegir - 1];
                        console.log(mostrarse(seleccionado));
                        let opt = prompt("Seleccione (E) para editar o cualquier otra para volver: ");
                        if (opt.toLowerCase() === "e") {
                            // Reusar el flujo de edición ya implementado: pedir campos opcionales
                            editarTarea(seleccionado, Estados, Dificultad);
                            console.log("Tarea editada exitosamente.");
                        }
                    }
                }
                // Construimos lista de tareas con su índice original para poder editar por posición
                break;
            case 3:
                let tituloBuscar = prompt("Ingrese el titulo de la tarea a buscar: ");
                const idx = tareas.findIndex(tarea => tarea.titulo.toLowerCase() === tituloBuscar.toLowerCase());
                if (idx !== -1) {
                    const tareaEncontrada = tareas[idx];
                    console.log("Tarea encontrada.");
                    console.log(mostrarse(tareaEncontrada));
                    let option = prompt("Seleccione (E) para seguir o otra letra para volver al menu: ");
                    if (option.toLowerCase() === "e") {
                        // Flujo de edición: pedimos campos opcionales y aplicamos cambios de forma pura
                        editarTarea(tareaEncontrada, Estados, Dificultad);
                        console.log("Tarea editada exitosamente.");
                    }
                }
                else {
                    console.log("Tarea no encontrada.");
                }
                break;
            case 4:
                console.log("Saliendo...");
                break;
            default:
                console.log("Opcion invalida");
        }
    } while (n !== 4);
}
main();

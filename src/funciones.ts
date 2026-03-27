import type { Tarea } from "./Tarea";
import promptSync from "prompt-sync";//esm
const prompt = promptSync();//esm
/**
 * Filtra tareas por el estado seleccionado (1-based index).
 * Devuelve un arreglo vacío si la selección no es válida.
 */
export function FiltrarEstados(Tareas: Tarea[], estados: string[], seleccion: number): Tarea[] {
    const ind = seleccion - 1;
    const estadoSeleccionado: string = estados[ind] ?? null;//devuelve el de la derecha si el de la izquiera es nullo (coalescencia nula)
    if (!estadoSeleccionado) return [];
    return Tareas.filter((tarea) => tarea.estado === estadoSeleccionado);
}

/**
 * Identidad segura: devuelve una copia superficial del arreglo de tareas.
 * Esta función es redundante en muchos contextos, pero conserva la intención
 * de "ver todas las tareas" sin exponer la referencia interna.
 */
export function VerTodasLasTareas(Tareas: Tarea[]): Tarea[] {
    return [...Tareas];
}


//Comprueba si el arreglo contiene elementos. Más conciso y puro.

export function ValidarArreglo(Tareas: Tarea[]): boolean {
    return Tareas.length > 0;
}

/**
 * Construye una representación de los títulos de las tareas.
 * Reemplaza la implementación recursiva por una composición pura (map + join).
 * El parámetro `contador` se mantiene opcional para compatibilidad con llamadas
 * existentes, pero se ignora porque la salida no depende de un índice inicial.
 */
export function ImprimirTitulos(tareas: Tarea[]): string {
    if (!Array.isArray(tareas) || tareas.length === 0) return "";
    return tareas.map((t) => `Estado: ${t.estado} - ${t.titulo}`).join("\n");
}

/**
 * Busca una tarea por título (case-insensitive, trim).
 */
export function buscarTarea(tareas: Tarea[], titulo: string): Tarea | undefined {
    return tareas.find((tarea) => tarea.titulo.toLowerCase() === titulo.toLowerCase());
}
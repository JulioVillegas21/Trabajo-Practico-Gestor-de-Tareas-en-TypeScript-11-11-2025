# Trabajo Práctico — Gestor de Tareas en TypeScript

Este proyecto fue desarrollado como **Trabajo Práctico** para la materia **Paradigmas de Programación**, representando una evolución en el uso de TypeScript y la organización del código.

📅 Fecha: 11/11/2025

## Descripción
Aplicación de consola que permite gestionar tareas mediante un menú interactivo. El sistema permite crear, buscar, visualizar y editar tareas.

El desarrollo fue realizado completamente en **TypeScript**, aplicando buenas prácticas de programación y organización modular.

## Funcionalidades
- Creación de tareas
- Visualización de tareas
- Filtrado por estado
- Búsqueda de tareas por título
- Edición de tareas
- Validación de datos de entrada

## Enfoque del desarrollo
El proyecto muestra una mejora en la forma de programar respecto a trabajos anteriores.

- Se utilizaron **interfaces** para definir estructuras de datos  
- Se implementaron **funciones puras** para el manejo de datos  
- Se trabajó con métodos de arreglos como `filter`, `map` y `find`  
- Se evitó modificar directamente los datos, utilizando copias (`spread operator`)  
- Se separaron responsabilidades en distintos módulos  

El flujo principal del programa se controla desde el archivo principal `main.ts`.

## Características técnicas
- Programación modular
- Tipado fuerte con TypeScript
- Uso de programación funcional
- Validación de entradas del usuario
- Separación entre lógica y presentación  

## Estructura del proyecto
- `main.ts`: flujo principal del programa  
- `Tarea.ts`: modelo de datos  
- `funciones.ts`: lógica auxiliar  
- `Menus.ts`: interfaz de usuario  
- `package.json`: dependencias  
- `tsconfig.json`: configuración del compilador  

## Tecnologías
- TypeScript
- Node.js

## Ejecución
Compilar el proyecto:
```bash
tsc

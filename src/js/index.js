/* 
    Clase que almacena la información de una tarea
*/
class Task {
    constructor() {
        this.check = ''
        this.description = ''
        this.date = ''
    }
}

/* 
    Clase que almacena las tareas 
*/
class List {
    constructor() {
        this.tasks = new Array()
    }

    /* 
        Almacena las tareas actuales dentro del atributo tasks
        $tasks: Array con todas las tareas contenidas en el elemento del DOM con id list
    */
    setTasks = ($tasks) => {
        if ($tasks.length) { // Comprobamos que hay tareas
            let task = Array.from($tasks)[$tasks.length - 1]
            this.tasks.push(new Task())
            // Almacenamos el check
            const check = task.children.taskCheck
            if (check.classList.contains('done')) {
                this.tasks[this.tasks.length - 1].check = 'true'
            } else {
                this.tasks[this.tasks.length - 1].check = 'false'
            }

            // Almacenamos la descripción
            const description = task.children.taskDescription
            this.tasks[this.tasks.length - 1].description = description.value

            // Almacenamos la fecha
            const date = task.children.taskDate
            this.tasks[this.tasks.length - 1].date = date.value
        }
    }

    /* 
        Devuelve las tareas para imprimir
    */
    getTasks = () => {
        var tasksHTML = ''
        if (this.tasks.length) {
            this.tasks.map((task) => {
                let taskHTML = this.printTask(task)
                // Añadimos clase show a taskRemove para que al situar el mouse aparezca la X y desaparezca al retirnarnos
        /*         let taskRemove = taskHTML.getElementById('taskRemove')
                taskHTML.addEventListener('mouseenter', () => {
                    taskRemove.classList.add('show')
                })

                taskHTML.addEventListener('mouseleave', () => {
                    taskRemove.classList.remove('show')
                })
                // Comprobación de si está chequeada la tarea y añadirle la clase
                const check = taskHTML.getElementById('taskCheck')
                addListenerClickCheck(check)
                if (task.check) {
                    check.classList.add('done')
                }
                tasksHTML += taskHTML */
            })
        }
        /*      this.tasks = [] */
        return tasksHTML
    }

    /* 
        Devuelve una tarea para imprimir
    */
    printTask = (task) => {
        return (
            `<div class="task" id="task">
                    <div class="task-check" id="taskCheck"></div>
                    <input type="text" class="task-description" id="taskDescription" placeholder="Nueva Tarea" value=${task.description}>
                    <input type="date" class="task-date" id="taskDate" value=${task.date}>
                    <div class="task-remove" id="taskRemove"><img src="./src/images/delete.svg" alt=""></div>
            </div>`
        )
    }
    addListenerClickCheck = ($element) => {
        $element.addEventListener("click", () => {
            $taskCheck.classList.toggle('done')
            $task.classList.toggle('done')
        })
    }

    /*     createTask = () => {
            this.tasks.push(new Task())
        } */
}

const $buttonAdd = document.getElementById("buttonAdd")
const $tasks = document.querySelectorAll("task")
const $list = document.getElementById("list").children
const $listDOM = document.getElementById("list")
/* const $taskRemove = document.getElementById("taskRemove") */

var myList = new List()

$buttonAdd.addEventListener('click', () => {
    myList.setTasks($list)
    /*     myList.createTask() */
    let $nuevaTarea = ''
    let nuevaTarea = new Task()
    $nuevaTarea += myList.getTasks()
    debugger
    $nuevaTarea += myList.printTask(nuevaTarea)
    $listDOM.innerHTML = $nuevaTarea
})

/* $taskCheck.addEventListener('click', () => {
    $taskCheck.classList.toggle('done')
    $task.classList.toggle('done')
}) */
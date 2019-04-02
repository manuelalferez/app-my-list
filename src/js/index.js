/* 
    Clase que almacena la información de una tarea
*/
class Task {
    constructor() {
        this.check = false
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
            let task = Array.from($tasks).forEach(task => {
                this.tasks.push(new Task())
                // Almacenamos el check
                const check = task.children.taskCheck
                if (check.classList.contains('done')) {
                    this.tasks[this.tasks.length - 1].check = true
                } else {
                    this.tasks[this.tasks.length - 1].check = false
                }

                // Almacenamos la descripción
                const description = task.children.taskDescription
                this.tasks[this.tasks.length - 1].description = description.value

                // Almacenamos la fecha
                const date = task.children.taskDate
                this.tasks[this.tasks.length - 1].date = date.value
            })
        }
    }

    /* 
        Devuelve las tareas para imprimir
    */
    getTasks = () => {
        var tasksHTML = ''
        if (this.tasks.length) {
            this.tasks.map((task) => { tasksHTML += this.printTask(task) })
        }
        this.tasks = []
        return tasksHTML
    }

    /* 
        Devuelve una tarea para imprimir
    */
    printTask = (task) => {
        debugger
        return (
            `<div class="task ${task.check ? 'done' : ''}" id="task" onmouseenter="mouseEnterTask()" onmouseleave="mouseLeaveTask()">
                    <div class="task-check ${task.check ? 'done' : ''}" id="taskCheck" onclick="checkClick()"></div>
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
}

mouseEnterTask = (event) => {
    const $taskRemove = this.event.toElement.children[3]
    $taskRemove.classList.add('show')
}

mouseLeaveTask = (event) => {
    const $taskRemove = this.event.fromElement.children[3]
    $taskRemove.classList.remove('show')
}

checkClick = () => {
    event.target.classList.toggle('done')
    event.target.parentNode.classList.toggle('done')
}


const $buttonAdd = document.getElementById("buttonAdd")
const $tasks = document.querySelectorAll("task")
const $list = document.getElementById("list").children
const $listDOM = document.getElementById("list")

var myList = new List()

$buttonAdd.addEventListener('click', () => {

    myList.setTasks($list)
    let $nuevaTarea = ''
    let nuevaTarea = new Task()
    $nuevaTarea += myList.getTasks()
    $nuevaTarea += myList.printTask(nuevaTarea)
    $listDOM.innerHTML = $nuevaTarea
})

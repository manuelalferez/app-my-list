/* 
    Clase que almacena la información de una tarea
*/
class Task {
    constructor(key) {
        this.check = false
        this.description = ''
        this.date = ''
        this.key = key
    }
} // class Task()

/* 
    Clase que almacena las tareas 
*/
class List {
    constructor() {
        this.tasks = new Array()
        this.numKey = 0
    }

    /* 
        Devuelve las tareas para imprimir en el DOM

        @return Las tareas concatenadas en formato de una cadena
    */
    getTasks = () => {
        var tasksHTML = ''
        if (this.tasks.length) {
            this.tasks.map((task) => { tasksHTML += this.getTaskToPrint(task) })
        }
        return tasksHTML
    }

    getTasksSearch = (description) => {
        var tasksHTML = ''
        if (this.tasks.length) {
            this.tasks.map((task) => {
                if (task.description.trim().toUpperCase() === description.trim().toUpperCase()) {
                    tasksHTML += this.getTaskToPrint(task)
                }
            })
        }
        return tasksHTML
    }

    /* 
        Devuelve una tarea para imprimir

        @param task: Tarea que se quiere imprimir
        @return Una tarea en formato de una cadena
    */
    getTaskToPrint = (task) => {
        return (
            `<div class="task ${task.check ? 'done' : ''}" id="task" data-id='${task.key}' onmouseenter="mouseEnterTask()" onmouseleave="mouseLeaveTask()">
                    <div class="task-check ${task.check ? 'done' : ''}" id="taskCheck" onclick="checkClick()"></div>
                    <input type="text" class="task-description" id="taskDescription" placeholder="Nueva Tarea" value='${task.description}' onchange="taskDescriptionChange()">
                    <input type="date" class="task-date" id="taskDate" value='${task.date}' onchange="taskDateChange()">
                    <div class="task-remove" id="taskRemove" onclick="taskRemoveClick()"><img src="./src/images/delete.svg" alt=""></div>
            </div>`
        )
    }

    /* 
        Busca la posición de una tarea con el key dado

        @param key: El key de la tarea que se está buscando
        @return Un entero con la posición si encuentra la tarea o una cadena vacía si no
    */
    findTask = (key) => {
        let pos = ''
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].key === key) {
                pos = i
                break
            }
        }
        return pos
    }

    /* 
        Cambia la descripción de una tarea

        @param key: El key de la tarea
        @param value: El nuevo valor para la descripción
    */
    changeDescription = (key, value) => {
        let pos = this.findTask(key)
        if (!isNaN(pos)) {
            this.tasks[pos].description = value // Almacenamos en la lista la descripción
            let name = `t_${key}`
            let task = JSON.parse(window.localStorage.getItem(name)) //El objeto del localStorage
            task.description = value // Almacenamos el nuevo valor en el localStorage
            window.localStorage.removeItem(name)
            window.localStorage.setItem(name, JSON.stringify(task)) // Volvemos a introducirlo, con la modificación
        }
    }

    /* 
        Cambia el check de una tarea

        @param key: El key de la tarea
    */
    changeClick = (key) => {
        let pos = this.findTask(key)
        if (!isNaN(pos)) {
            this.tasks[pos].check = this.tasks[pos].check ? false : true
            let name = `t_${key}`
            let task = JSON.parse(window.localStorage.getItem(name))
            task.check = this.tasks[pos].check
            window.localStorage.removeItem(name)
            window.localStorage.setItem(name, JSON.stringify(task))
        }
    }

    /* 
        Cambia la fecha de una tarea

        @param key: El key de la tarea
        @param value: La nueva fecha

    */
    changeDate = (key, value) => {
        let pos = this.findTask(key)
        if (!isNaN(pos)) {
            this.tasks[pos].date = value // Almacenamos en la lista
            let name = `t_${key}`
            let task = JSON.parse(window.localStorage.getItem(name))
            task.date = value
            window.localStorage.removeItem(name)
            window.localStorage.setItem(name, JSON.stringify(task))
        }
    }

    /* 
        Crea una tarea 

        @note1 Crea una tarea y le asigna un key por defecto, después el key se incrementará para la siguiente tarea. 
        @note2 Almacena numKey en el localStorage, para llevar un conteo del total de tareas creadas
    */
    createTask = () => {
        this.tasks.push(new Task(this.numKey))
        // Almacenamos la última tarea en el localStorage
        window.localStorage.setItem(`t_${this.numKey}`, JSON.stringify(this.tasks[this.tasks.length - 1]))
        this.numKey++
        window.localStorage.numKey = this.numKey
    }

    /* 
        Elimina una tarea

        @param key: El key de la tarea a eliminar
    */
    removeTask = (key) => {
        let pos = this.findTask(key)
        this.tasks.splice(pos, 1)
        let name = `t_${key}`
        window.localStorage.removeItem(name)
    }

    /* 
        Copia una tarea

        @param task: La tarea a copiar
        @note Crea la tarea en this.tasks y después le copia los datos
    */
    copyTask = (task) => {
        this.tasks.push(new Task(task.key))
        let last = this.tasks.length - 1
        this.tasks[last].check = task.check
        this.tasks[last].description = task.description
        this.tasks[last].date = task.date

        // Si la nueva tarea tiene un key superior a numKey, quiere decir que se han eliminado tareas
        // Los nuevas asignaciones deben de ir a continuación del valor del key si éste es más alto
        // ¿Por qué? Porque es la implementación más sencilla, de otra manera, tendríamos que tener en cuenta
        // los numKey que faltan en la secuencia e ir completándolos...
        if (task.key > this.numKey) {
            this.numKey = task.key + 1
        } else {
            this.numKey++
        }
    } //copyTask()
} // class List

/* 
    Muestra el botón de eliminar cuando el mouse entra a la tarea
*/
mouseEnterTask = (event) => {
    const $taskRemove = this.event.toElement.children[3]
    $taskRemove.classList.add('show')
}

/* 
    Oculta el botón de eliminar cuando el mouse abandona la tarea
*/
mouseLeaveTask = (event) => {
    const $taskRemove = this.event.fromElement.children[3]
    $taskRemove.classList.remove('show')
}

/* 
    Detecta un click taskCheck y avisa a changeClick()
*/
checkClick = () => {
    myList.changeClick(parseInt(event.target.parentNode.dataset.id))
    event.target.classList.toggle('done')
    event.target.parentNode.classList.toggle('done')
}

/* 
    Detecta un click taskRemove y avisa a removeTask()
*/
taskRemoveClick = () => {
    myList.removeTask(parseInt(event.target.parentNode.parentNode.dataset.id))
    event.target.parentNode.parentNode.remove()
}

/* 
    Detecta cambio en taskDescription y avisa a changeDescription()
*/
taskDescriptionChange = () => {
    myList.changeDescription(parseInt(event.target.parentNode.dataset.id), event.target.value)
}

/* 
    Detecta un cambio en taskDate y avisa a changeDate()
*/
taskDateChange = () => {
    myList.changeDate(parseInt(event.target.parentNode.dataset.id), event.target.value)
}

// Selección de elementos del DOM
const $buttonAdd = document.getElementById("buttonAdd")
const $tasks = document.querySelectorAll("task")
const $list = document.getElementById("list").children
const $listDOM = document.getElementById("list")
const $form = document.getElementById("form")

// Creación de la lista perteneciente a la APP
var myList = new List()

/* 
    Detecta un click en el botón de añadir tarea
*/
$buttonAdd.addEventListener('click', () => {
    let $nuevaTarea = ''
    $nuevaTarea += myList.getTasks()
    myList.createTask()
    $nuevaTarea += myList.getTaskToPrint(myList.tasks[myList.tasks.length - 1])
    $listDOM.innerHTML = $nuevaTarea
})

/* 
    Detecta una búsqueda sobre la barra de búsqueda

    @post Realiza un renderizado de la lista de tareas del DOM
    @note Realiza una búsqueda entre las tareas de myList y comprueba si alguna concuerda con la descripción introducida
*/
$form.addEventListener('submit', () => {
    event.preventDefault()
    var palabraBuscada = event.target.name.value
    let $busqueda = ''
    if (palabraBuscada) {
        $busqueda += myList.getTasksSearch(event.target.name.value)
    } else { // Si la búsqueda es vacía se muestran todas las tareas
        $busqueda += myList.getTasks()
    }
    $listDOM.innerHTML = $busqueda
})

/* 
    Detecta cuando el ratón abandona la barra de búsqueda

    @post Cuando la barra de búsqueda está vacía y el ratón se retira se muestran todas las tareas
*/
$form.addEventListener('mouseleave', ()=>{
    var campo = event.target.name.value
    if(!campo){
        $listDOM.innerHTML = myList.getTasks()
    }
})

/* 
    Recupera del localStorage las tareas, si las hubiere, y las almacena en myList
    Muestra las tareas en el DOM
    
*/
window.onload = () => {
    let task = JSON.parse(window.localStorage.getItem('t_0')) // Comprobamos que existe al menos una tarea
    let i = 0, tasksHTML = ''
    // Si no hay nada no entra y si hay alguna tarea se ejecuta hasta que no haya más
    while (i < window.localStorage.getItem('numKey')) {
        if (task) {
            myList.copyTask(task)
            tasksHTML += myList.getTaskToPrint(task)
        }
        i++
        task = JSON.parse(window.localStorage.getItem(`t_${i}`))
    }
    $listDOM.innerHTML = tasksHTML;
}
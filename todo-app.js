const todos = [{
    text: 'Study',
    completed: true
}, {
    text: 'Clean the house',
    completed: false
}, {
    text: 'Relax',
    completed: true 
}, {
    text: 'Exercise',
    completed: false
}, {
    text: 'Feed the cats',
    completed: false
}]

const filters = {
    searchText: '',
    hideCompleted: false 
}

const renderTodos = function (todos, filters) {
    let filteredTodos = todos.filter(function (todo) {
            return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    filteredTodos = filteredTodos.filter(function (todo) {
        if (filters.hideCompleted) {
            return !todo.completed // si sí tiene hidecompleted activado regresa o no el elemento dependiendo si fue completado
        } else {
            return true 
        }
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''

    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#todos').appendChild(summary)

    filteredTodos.forEach(function (todo) {
        const todoEl = document.createElement('p')
        todoEl.textContent = todo.text
        document.querySelector('#todos').appendChild(todoEl)
    })
}

renderTodos(todos, filters) 





document.querySelector('#search-todo').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})


document.querySelector('#todo-form').addEventListener('submit', function (e) {
    e.preventDefault()

    todos.push({
        text: e.target.elements.newTodo.value,
        completed: false 
    })

    renderTodos(todos, filters)     
    e.target.elements.newTodo.value = ''
})




document.querySelector('#hide-completed').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})


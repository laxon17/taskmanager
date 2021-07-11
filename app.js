// Define UI variables

    const form = document.querySelector('#task-form');
    const taskList = document.querySelector('.collection');
    const clearBtn = document.querySelector('.clear-tasks');
    const filter = document.querySelector('#filter');
    const taskInput = document.querySelector('#task');

// Load all event listeners

    loadEventListeners();

// Load all event listeners

    function loadEventListeners() {
        // add task event
        form.addEventListener('submit', addTask);
        // remove task
        taskList.addEventListener('click', removeTask);
        // clear task
        clearBtn.addEventListener('click', clearTask);
        // filter tasks
        filter.addEventListener('keyup', filterTask);
    }

        /// FUNCTIONS \\\

        // addTask function

    function addTask(e) {
        if(taskInput.value === '') {
            alert('Add a task!');
        }

        // Create Li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create txt node & append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append link to li
        li.appendChild(link);
        // Apend li to ul
        taskList.appendChild(li);

        // Store to local storage
        storeToStorage(taskInput.value);    // will be called whenever a new task is added

        // Clear
        taskInput.value = '';
        e.preventDefault();
    }

     // Store task

    function storeToStorage(task) {
        let tasks;
        if(localStorage.getItem('tasks') === null)
            {
                tasks = [];
            }
        else
            {
                tasks = JSON.parse(localStorage.getItem('tasks'));
            }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks)); 
    }

        // Get tasks
    
    function getTask(task) {
        let tasks;
        if(localStorage.getItem('tasks') === null)
            {
                tasks = [];
            }
        else
            {
                tasks = JSON.parse(localStorage.getItem('tasks'));
            }
        
        tasks.forEach(function(task){
            // Create Li element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Create txt node & append to li
            li.appendChild(document.createTextNode(task));
            // Create new link element
            const link = document.createElement('a');
            // Add class
            link.className = 'delete-item secondary-content';
            // Add icon
            link.innerHTML = '<i class="fa fa-remove"></i>';
            // Append link to li
            li.appendChild(link);
            // Apend li to ul
            taskList.appendChild(li);
        });
    }

        // Remove task function 

    function removeTask(e) {
        if(e.target.parentElement.classList.contains('delete-item'))
            {
                if(confirm('Are you sure?'))
                    {
                        e.target.parentElement.parentElement.remove();
                    }
            }
    }

        // Clear tasks function

    function clearTask() {

        //  1st method
        //  taskList.innerHTML = '';

        //  2nd method
        if(confirm('Do you really want to delete all tasks?'))
            {
                while(taskList.firstChild)
                    {
                        taskList.removeChild(taskList.firstChild);
                    }
            }
    }

        // Filter tasks function

    function filterTask(e) {
        const text = e.target.value.toLowerCase();

        document.querySelectorAll('.collection-item').forEach(function(task){
            const item = task.firstChild.textContent;
                if(item.toLowerCase().indexOf(text) != -1)
                    {
                        task.style.display = 'block';
                    }
                else
                    {
                        task.style.display = 'none';
                    }
        });
    }

     
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import ManageTask from './components/ManageTask';
import Footer from './components/Footer';
import { StoreContext } from './StoreContext';

function App() {

    const [showAddTask, setShowAddTask] = useState(false);
    const [tass, setTask] = useState([]);

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const data = await fetch('http://localhost:5000/tasks');
        const json = await data.json();
        setTask(json);
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE',
        });
        setTask(tass.filter((task) => task.id !== id));
    };

    const updateTask = async (type, id, task = {}) => {

        const fetchData = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await fetchData.json();
        let reminder = data.reminder;
        let updateTask = {};

        if (type === 'toggle') {
            updateTask = { ...data, reminder: !reminder }
        } else if (type === 'update') {
            updateTask = { ...data, ...task, day: new Date(task.day).toLocaleString('en-US', options) }
        }

        const updateReminder = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateTask)
        });
        const updatedData = await updateReminder.json();

        setTask(
            tass.map((task) =>
                task.id === id ? { ...task, ...updatedData } : task
            )
        );
    };

    const addTask = async (task) => {
        const id = Math.floor(Math.random() * 10000) + 1;

        console.log(new Date(task.day).toLocaleString('en-US', options))

        const newTask = { id: id, ...task, day: new Date(task.day).toLocaleString('en-US', options) };

        const res = await fetch(`http://localhost:5000/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
        const data = await res.json();

        setTask([...tass, data]);
        setShowAddTask(false);
    }

    return (
        <StoreContext.Provider value={[updateTask, deleteTask]}>
            <div className='container'>
                <Header onClick={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
                {showAddTask && <ManageTask onAdd={addTask} />}
                <Tasks tasks={tass} />
                <Footer />
            </div>
        </StoreContext.Provider>
    );
}

export default App;

import React, { useState, useContext } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import ManageTask from './ManageTask';
import { StoreContext } from '../StoreContext';

const Task = ({ task }) => {
    const [ onUpdate, deleteTask ] = useContext(StoreContext);
    const [edit, setEdit] = useState(false);

    const changeState = () => {
        setEdit(false);
    }

    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onUpdate('toggle', task.id, {})}>
            {edit ?
                <ManageTask task={task} type={'update'} onAdd={onUpdate} changeState={changeState} />
                :
                <>
                    <h3>{task?.text} <div> <FaEdit style={{ cursor: 'pointer', marginLeft: '0px' }} onClick={() => setEdit(true)} />  <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteTask(task.id)} /></div> </h3>
                    <p>{task?.day}</p>
                </>
            }
        </div>
    )
}

export default Task

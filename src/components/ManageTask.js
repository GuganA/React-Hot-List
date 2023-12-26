import React, { useState } from 'react';
import Button from './Button';

const ManageTask = ({ task, type, onAdd, changeState }) => {

    const currentTime = (task?.day ? new Date(task?.day) : new Date()).toLocaleString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(' ', 'T');

    const [text, setText] = useState(task?.text || '');
    const [dateTime, setDateTime] = useState(currentTime);
    const [remainder, setRemainder] = useState(task?.remainder || false);

    const submit = (e) => {
        e.preventDefault();
        if (!text) {
            alert(`Please enter task to proceed`);
            return;
        }

        if (type === 'add') {
            onAdd({ text: text, day: dateTime, reminder: remainder });
        } else if (type === 'update') {
            onAdd(type, task?.id, { text: text, day: dateTime, reminder: remainder });
            changeState();
        }

        setText('');
        setDateTime(currentTime);
        setRemainder(false);
    }

    return (
        <form className='add-form' onSubmit={submit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Date</label>
                <input type='datetime-local' placeholder='Date & Time' value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
            </div>
            <Button text='Save' type='submit' className='btn btn-block' />
        </form>
    )
}

ManageTask.defaultProps = {
    task: {},
    type: 'add'
}

export default ManageTask;

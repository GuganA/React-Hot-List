import React from 'react';
import Task from './Task';

const Tasks = ({ tasks }) => {

    return (
        <>
            {tasks?.length > 0 ? tasks.map((task, index) =>
                <Task key={index} task={task} />
            ) : 'Nothing is in your Hot list'}
        </>
    )
}

export default Tasks

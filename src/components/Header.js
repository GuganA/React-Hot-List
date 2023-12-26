import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ title, onClick, showAddTask }) => {

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button text={!showAddTask ? 'Create' : 'Close'} onClick={onClick}/>
        </header>
    )
};

Header.defaultProps = {
    title: 'Hot List',
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header

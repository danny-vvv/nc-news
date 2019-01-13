import React from 'react';
import PropTypes from 'prop-types';

const Sort = props => {
    const { updateParentState, options } = props;
    const handleChange = (event) => {
        const sort_by = event.target.value;
        changeSortBy(sort_by)
    }

    function changeSortBy(sort_by) {
        updateParentState({
            sort_by
        })
    }

    return (
        <form onChange={(event) => handleChange(event)}>
            <label htmlFor='sort_by'>SORT </label>
            <select id='sort_by'>
                {options.map(option => <option key={option.value} value={option.value}>{option.name}</option>)}
            </select>
        </form>
    );
};

Sort.propTypes = {
    updateParentState: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Sort;
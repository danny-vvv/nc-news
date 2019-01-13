import React from 'react';
import PropTypes from 'prop-types';

const Sort = props => {
    const { updateParentState } = props;
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
                <option value='comment_count'>Popular</option>
                <option value='created_at'>New</option>
                <option value='votes'>Top</option>
            </select>
        </form>
    );
};

Sort.propTypes = {
    updateParentState: PropTypes.func.isRequired
};

export default Sort;
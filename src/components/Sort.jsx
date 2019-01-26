import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, Select, FormControl, MenuItem, InputLabel,
} from '@material-ui/core';

const Sort = (props) => {
  const {
    sort_by, classes, options, updateParentState,
  } = props;

  const handleChange = (event) => {
    const newSortBy = event.target.value;
    updateParentState(newSortBy);
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="sort">SORT</InputLabel>
        <Select
          value={sort_by}
          onChange={event => handleChange(event)}
          name="sort_by"
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
};

Sort.propTypes = {
  sort_by: PropTypes.string,
  updateParentState: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    formControl: PropTypes.string,
  }).isRequired,
};

Sort.defaultProps = {
  sort_by: undefined,
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

export default withStyles(styles)(Sort);

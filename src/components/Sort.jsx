import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, Select, Input, FormControl, MenuItem, FormHelperText,
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
      <FormControl className={classes.formControl}>
        <Select
          value={sort_by}
          onChange={event => handleChange(event)}
          input={<Input name="sort_by" id="sort-label-placeholder" />}
          name="sort_by"
          className={classes.selectEmpty}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
          ))}
        </Select>
        <FormHelperText>SORT</FormHelperText>
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
    selectEmpty: PropTypes.string,
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
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(Sort);

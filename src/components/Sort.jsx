import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, Select, Input, FormControl, MenuItem,
} from '@material-ui/core';

class Sort extends Component {
    state = {
      sort_by: 'comment_count',
    }

    handleChange = (event) => {
      const sort_by = event.target.value;
      this.changeSortBy(sort_by);
      this.setState({ sort_by });
    }

    changeSortBy(sort_by) {
      const { updateParentState } = this.props;
      updateParentState({ sort_by });
    }

    render() {
      const { sort_by } = this.state;
      const { classes, options } = this.props;

      return (
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <Select
              value={sort_by}
              onChange={event => this.handleChange(event)}
              input={<Input name="sort_by" id="sort-label-placeholder" />}
              name="sort_by"
              className={classes.selectEmpty}
            >
              {options.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      );
    }
}

Sort.propTypes = {
  updateParentState: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    formControl: PropTypes.string,
    selectEmpty: PropTypes.string,
  }).isRequired,
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

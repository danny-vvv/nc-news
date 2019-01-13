import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Login from './Login';

class Form extends Component {
    state = {
        success: false,
        fail: false,
        apiRejected: false
    }
    render() {
        const { success, fail, apiRejected } = this.state;
        const { requireLoggedIn, username, changeLoginState, inputs, rejectMessage } = this.props;
        return (
            <React.Fragment>
                {requireLoggedIn && !username && <Login changeLoginState={changeLoginState} />}

                {((requireLoggedIn && username) || !requireLoggedIn) && !success &&
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        {
                            inputs.map((input, i) => (
                                <React.Fragment key={i}>
                                    <span>{this.capitalise(input.id) + ': '}</span>
                                    {input.type === 'text' &&
                                        <input type='text' id={input.id} onChange={this.handleChange}></input>
                                    }
                                    {input.type === 'select' &&
                                        <select id={input.id} onChange={this.handleChange}>
                                            <option value=''>Select...</option>
                                            {input.options.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    }
                                    <br />
                                </React.Fragment>
                            ))
                        }
                        {<button type='submit' className='btn-submit'>Submit</button>}
                    </form>
                }
                {fail && <p>Please complete all fields.</p>}
                {apiRejected && rejectMessage && <p>{rejectMessage}</p>}
            </React.Fragment>
        );
    }

    handleChange = (event) => {
        this.setState(({ [event.target.id]: event.target.value.trim() }))
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.isFormComplete()) {
            this.setState({ success: true, fail: false })
            const requestBody = { ...this.state, ...this.props.apiArgs };
            delete requestBody['success']
            delete requestBody['fail']
            delete requestBody['apiRejected']
            this.handleApiRequest(requestBody)
        } else {
            this.setState({ success: false, fail: true })
        }
    }

    isDefinedInState = (input) => this.state[input.id];

    isFormComplete() {
        const { inputs } = this.props;
        const complete = inputs.every(this.isDefinedInState)
        return complete;
    }

    capitalise(word) {
        return word[0].toUpperCase() + word.slice(1)
    }

    handleApiRequest(requestBody) {
        const { apiMethod, successUrl, successEndpoint, updateParent } = this.props;
        apiMethod(requestBody)
            .then((res) => {
                if (successUrl) navigate(`${successUrl}/${res[successEndpoint]}`)
                else if (updateParent) updateParent()
            })
            .catch((err) => {
                console.log(err)
                this.setState({ apiRejected: true })
            })
    }

    componentDidMount() {
        const { setHeading, heading } = this.props;
        if (setHeading) { setHeading(heading); }
    }

    componentDidUpdate(prevProps) {
        const { setHeading, heading, path } = this.props;
        if (path !== prevProps.path) {
            setHeading(heading);
        }
    }
}

Form.propTypes = {
    inputs: PropTypes.array.isRequired,
    apiMethod: PropTypes.func.isRequired,
    successUrl: PropTypes.string,
    rejectMessage: PropTypes.string,
    successEndpoint: PropTypes.string,
    apiArgs: PropTypes.object,
    requireLoggedIn: PropTypes.bool,
    setHeading: PropTypes.func,
    heading: PropTypes.string,
    path: PropTypes.string,
    updateParent: PropTypes.func
};

export default Form;
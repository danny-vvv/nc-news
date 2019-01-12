import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import './Form.css';

class Form extends Component {
    state = {
        success: false,
        fail: false,
        apiRejected: false
    }
    render() {
        const { success, fail, apiRejected } = this.state;
        const { inputs, rejectMessage } = this.props;
        const { textInputs } = inputs;
        return (
            <React.Fragment>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    {textInputs &&
                        textInputs.map((textInput, i) => (
                            <React.Fragment key={i}>
                                <span>{this.capitalise(textInput) + ': '}</span>
                                <input type='text' id={textInput} onChange={this.handleChange}></input>
                                <br />
                            </React.Fragment>
                        ))
                    }
                    <button type='submit' className='btn-submit'>Submit</button>
                </form>
                {success && <p>Please wait...</p>}
                {fail && <p>Please complete all fields.</p>}
                {apiRejected && <p>{rejectMessage}</p>}
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
            const requestBody = { ...this.state };
            delete requestBody['success']
            delete requestBody['fail']
            delete requestBody['apiRejected']
            this.handleApiRequest(requestBody)
        } else {
            this.setState({ success: false, fail: true })
        }
    }

    isDefinedInState = (input) => this.state[input];

    isFormComplete() {
        const { textInputs } = this.props.inputs;
        const complete = textInputs.every(this.isDefinedInState)
        return complete;
    }

    capitalise(word) {
        return word[0].toUpperCase() + word.slice(1)
    }

    handleApiRequest(requestBody) {
        const { apiMethod, successUrl, successEndpoint } = this.props;
        apiMethod(requestBody)
            .then((res) => {
                navigate(`${successUrl}/${res[successEndpoint]}`)
            })
            .catch((err) => {
                console.log(err)
                this.setState({ apiRejected: true })
            })
    }
}

Form.propTypes = {
    inputs: PropTypes.object.isRequired,
    apiMethod: PropTypes.func.isRequired,
    successUrl: PropTypes.string,
    rejectMessage: PropTypes.string.isRequired,
    successEndpoint: PropTypes.string.isRequired,
};

export default Form;
import React from 'react';
import SubmitForm from './SubmitForm';
import Login from './Login';

const Submit = props => {
  const { username } = props;
  return (
    <div>
      {username && <SubmitForm />}
      {!username && <Login changeLoginState={props.changeLoginState} />}
    </div>
  );
};

export default Submit;
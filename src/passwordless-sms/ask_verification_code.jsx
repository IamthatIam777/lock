import React from 'react';
import CredentialsPane from '../lock/credentials_pane';
import VerificationCodeInput from '../credentials/verification_code_input';
import { changeVerificationCode } from './actions';
import * as l from '../lock/index';
import * as c from '../credentials/index';

export default class AskVerificationCode extends React.Component {
  render() {
    const { lock } = this.props;

    return (
      <CredentialsPane lock={lock}>
        <div className="auth0-lock-form auth0-lock-passwordless">
          <h2>Enter the code</h2>
          <p>
            Pleace check your phone ({c.fullHumanPhoneNumber(lock)})<br />
            You've received a message from us<br />
            with your passcode.
          </p>
          <VerificationCodeInput value={c.verificationCode(lock)}
            isValid={!c.visiblyInvalidVerificationCode(lock) && !l.globalError(lock)}
            onChange={::this.handleVerificationCodeChange}
            autoFocus={l.ui.focusInput(lock)} />
        </div>
      </CredentialsPane>
    );
  }

  handleVerificationCodeChange(e) {
    e.preventDefault();
    changeVerificationCode(l.id(this.props.lock), e.target.value);
  }
}
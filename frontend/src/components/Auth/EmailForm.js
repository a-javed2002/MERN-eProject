// EmailForm.js
import React from 'react';

const EmailForm = ({ email, setEmail, sendOtp }) => {
  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <span className="fas fa-envelope" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <button onClick={sendOtp} className="btn btn-primary btn-block">Request new password</button>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;

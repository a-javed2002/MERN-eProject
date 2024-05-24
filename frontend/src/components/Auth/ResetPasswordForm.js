// ResetPasswordForm.js
import React from 'react';

const ResetPasswordForm = ({ newPassword, setNewPassword, resetPassword }) => {
  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <span className="fas fa-lock" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <button onClick={resetPassword} className="btn btn-primary btn-block">Reset Password</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;

// OtpForm.js
import React from 'react';

const OtpForm = ({ otp, setOtp, verifyOtp }) => {
  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <span className="fas fa-key" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <button onClick={verifyOtp} className="btn btn-primary btn-block">Verify OTP</button>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;

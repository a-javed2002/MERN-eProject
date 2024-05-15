import React from "react";
import { NavLink } from "react-router-dom";

const MyFooter = () => {
  return (
    <>
      {/*footer start*/}
<footer className="site-footer">
  <div className="text-center">
    <p>
      © Copyrights <strong>Dashio</strong>. All Rights Reserved
    </p>
    <div className="credits">
      {/*
      You are NOT allowed to delete the credit link to TemplateMag with free version.
      You can delete the credit link only if you bought the pro version.
      Buy the pro version with working PHP/AJAX contact form: https://templatemag.com/dashio-bootstrap-admin-template/
      Licensing information: https://templatemag.com/license/
    */}
      Created with Dashio template by <a href="https://templatemag.com/">TemplateMag</a>
    </div>
    <a href="index.html#" className="go-top">
      <i className="fa fa-angle-up" />
    </a>
  </div>
</footer>
{/*footer end*/}

    </>
  );
};
export default MyFooter;

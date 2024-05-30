import React from 'react'
import MyAsideBar from '../Main/aside'
import MyHeader from '../Main/header'

const modalAndAlerts = () => {
  return (
    <>
    <MyHeader/>
        <MyAsideBar/>
     <div>
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>
            Modals &amp; Alerts
            <small>new</small>
          </h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Modals &amp; Alerts</li>
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-edit" />
                Modal Examples
              </h3>
            </div>
            <div className="card-body">
              <button type="button" className="btn btn-default" data-toggle="modal" data-target="#modal-default">
                Launch Default Modal
              </button>
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal-primary">
                Launch Primary Modal
              </button>
              <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#modal-secondary">
                Launch Secondary Modal
              </button>
              <button type="button" className="btn btn-info" data-toggle="modal" data-target="#modal-info">
                Launch Info Modal
              </button>
              <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#modal-danger">
                Launch Danger Modal
              </button>
              <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#modal-warning">
                Launch Warning Modal
              </button>
              <button type="button" className="btn btn-success" data-toggle="modal" data-target="#modal-success">
                Launch Success Modal
              </button>
              <br />
              <br />
              <button type="button" className="btn btn-default" data-toggle="modal" data-target="#modal-sm">
                Launch Small Modal
              </button>
              <button type="button" className="btn btn-default" data-toggle="modal" data-target="#modal-lg">
                Launch Large Modal
              </button>
              <button type="button" className="btn btn-default" data-toggle="modal" data-target="#modal-xl">
                Launch Extra Large Modal
              </button>
              <br />
              <br />
              <button type="button" className="btn btn-default" data-toggle="modal" data-target="#modal-overlay">
                Launch Modal with Overlay
              </button>
              <div className="text-muted mt-3">
                Instructions for how to use modals are available on the
                <a href="https://getbootstrap.com/docs/4.4/components/modal/">Bootstrap documentation</a>
              </div>
            </div>
            {/* /.card */}
          </div>
          <div className="card card-info card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-edit" />
                Toasts Examples <small>built in AdminLTE</small>
              </h3>
            </div>
            <div className="card-body">
              <button type="button" className="btn btn-default toastsDefaultDefault">
                Launch Default Toast
              </button>
              <button type="button" className="btn btn-default toastsDefaultFull">
                Launch Full Toast (with icon)
              </button>
              <button type="button" className="btn btn-default toastsDefaultFullImage">
                Launch Full Toast (with image)
              </button>
              <button type="button" className="btn btn-default toastsDefaultAutohide">
                Launch Default Toasts with autohide
              </button>
              <button type="button" className="btn btn-default toastsDefaultNotFixed">
                Launch Default Toasts with not fixed
              </button>
              <br />
              <br />
              <button type="button" className="btn btn-default toastsDefaultTopLeft">
                Launch Default Toast (topLeft)
              </button>
              <button type="button" className="btn btn-default toastsDefaultBottomRight">
                Launch Default Toast (bottomRight)
              </button>
              <button type="button" className="btn btn-default toastsDefaultBottomLeft">
                Launch Default Toast (bottomLeft)
              </button>
              <br />
              <br />
              <button type="button" className="btn btn-success toastsDefaultSuccess">
                Launch Success Toast
              </button>
              <button type="button" className="btn btn-info toastsDefaultInfo">
                Launch Info Toast
              </button>
              <button type="button" className="btn btn-warning toastsDefaultWarning">
                Launch Warning Toast
              </button>
              <button type="button" className="btn btn-danger toastsDefaultDanger">
                Launch Danger Toast
              </button>
              <button type="button" className="btn btn-default bg-maroon toastsDefaultMaroon">
                Launch Maroon Toast
              </button>
              <div className="text-muted mt-3">
              </div>
            </div>
          </div>
          <div className="card card-success card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-edit" />
                SweetAlert2 Examples
              </h3>
            </div>
            <div className="card-body">
              <button type="button" className="btn btn-success swalDefaultSuccess">
                Launch Success Toast
              </button>
              <button type="button" className="btn btn-info swalDefaultInfo">
                Launch Info Toast
              </button>
              <button type="button" className="btn btn-danger swalDefaultError">
                Launch Error Toast
              </button>
              <button type="button" className="btn btn-warning swalDefaultWarning">
                Launch Warning Toast
              </button>
              <button type="button" className="btn btn-default swalDefaultQuestion">
                Launch Question Toast
              </button>
              <div className="text-muted mt-3">
                For more examples look at <a href="https://sweetalert2.github.io/">https://sweetalert2.github.io/</a>
              </div>
            </div>
            {/* /.card */}
          </div>
          <div className="card card-warning card-outline">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-edit" />
                Toastr Examples
              </h3>
            </div>
            <div className="card-body">
              <button type="button" className="btn btn-success toastrDefaultSuccess">
                Launch Success Toast
              </button>
              <button type="button" className="btn btn-info toastrDefaultInfo">
                Launch Info Toast
              </button>
              <button type="button" className="btn btn-danger toastrDefaultError">
                Launch Error Toast
              </button>
              <button type="button" className="btn btn-warning toastrDefaultWarning">
                Launch Warning Toast
              </button>
              <div className="text-muted mt-3">
                For more examples look at <a href="https://codeseven.github.io/toastr/">https://codeseven.github.io/toastr/</a>
              </div>
            </div>
            {/* /.card */}
          </div>
        </div>
        {/* /.col */}
      </div>
      {/* ./row */}
    </div>{/* /.container-fluid */}
    <div className="modal fade" id="modal-default">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Default Modal</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>One fine body…</p>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
    {/* /.modal */}
    <div className="modal fade" id="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="overlay">
            <i className="fas fa-2x fa-sync fa-spin" />
          </div>
          <div className="modal-header">
            <h4 className="modal-title">Default Modal</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>One fine body…</p>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
    {/* /.modal */}
    <div className="modal fade" id="modal-primary">
      <div className="modal-dialog">
        <div className="modal-content bg-primary">
          <div className="modal-header">
            <h4 className="modal-title">Primary Modal</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>One fine body…</p>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-outline-light" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-outline-light">Save changes</button>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
    {/* /.modal */}
    <div className="modal fade" id="modal-secondary">
      <div className="modal-dialog">
        <div className="modal-content bg-secondary">
          <div className="modal-header">
            <h4 className="modal-title">Secondary Modal</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>One fine body…</p>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-outline-light" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-outline-light">Save changes</button>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
    {/* /.modal */}
    <div className="modal fade" id="modal-info">
      <div className="modal-dialog">
        <div className="modal-content bg-info">
          <div className="modal-header">
            <h4 className="modal-title">Info Modal</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>One fine body…</p>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-outline-light" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-outline-light">Save changes</button>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
    {/* /.modal */}
    <div className="modal fade" id="modal-warning">
      <div className="modal-dialog">
        <div className="modal-content bg-warning">
          <div className="modal-header">
            <h4 className="modal-title">Warning Modal</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>One fine body…</p>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-outline-dark" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-outline-dark">Save changes</button>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
    {/* /.modal */}
    <div className="modal fade" id="modal-success">
      <div className="modal-dialog">
        <div className="modal-content bg-success">
          <div className="modal-header">
            <h4 className="modal-title">Success Modal</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>One fine body…</p>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-outline-light" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-outline-light">Save changes</button>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
    {/* /.modal */}
    <div className="modal fade" id="modal-danger">
      <div className="modal-dialog">
        <div className="modal-content bg-danger">
          <div className="modal-header">
            <h4 className="modal-title">Danger Modal</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>One fine body…</p>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-outline-light" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-outline-light">Save changes</button>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
    {/* /.modal */}
    <div className="modal fade" id="modal-sm">
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Small Modal</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>One fine body…</p>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
    {/* /.modal */}
    <div className="modal fade" id="modal-lg">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Large Modal</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>One fine body…</p>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
    {/* /.modal */}
    <div className="modal fade" id="modal-xl">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Extra Large Modal</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>One fine body…</p>
          </div>
          <div className="modal-footer justify-content-between">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>
    {/* /.modal */}
  </section>
  {/* /.content */}
</div>

    </>
  )
}

export default modalAndAlerts
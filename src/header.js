import React from "react";
// import ReactDom from "react-dom"

class FBExtHeader extends React.Component {
  Close() {
    window.close();
  }
  render() {
    return (
      <div className="header-container w-100 pb-2">
        <div className="logo float-start">
          <img
            className="img-fluid"
            src="/images/imor-logo.png"
            alt="logo"
          ></img>
        </div>

        <div className="options float-end">
          <img className="img-fluid" src="/images/share.svg" alt="help"></img>
          <span className="border-end border-light border-3 mx-2"></span>
          <a href="#" rel="noreferrer">
            <img
              className="img-fluid"
              src="/images/settings.svg"
              alt="help"
            ></img>
          </a>
          <span className="border-end border-light border-3 mx-2"></span>
          <a href="#" rel="noreferrer">
            <img className="img-fluid" src="/images/help.svg" alt="help"></img>
          </a>
          <span className="border-end border-light border-3 mx-2"></span>
          <img
            className="img-fluid"
            src="/images/close.svg"
            onClick={this.Close}
            alt="close"
          ></img>
        </div>
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default FBExtHeader;

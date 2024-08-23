import React from "react";
import Container from "../component/Container";

function CheckOut() {
  return (
    <Container>
      <h1 className="text-center">Shipping Address</h1>
      <hr />
    <div className="row">
      <div className="col-md-6 mx-auto">
      <form action="">
  <div className="form-group">
    <input type="text" name="name" id="name" placeholder="Enter reciepent name" className="form-control"/>
  </div>
  <div className="form-group">
    <input type="text" name="name" id="name" placeholder="Enter reciepent name" className="form-control"/>
  </div>
  <div className="form-group">
    <input type="text" name="name" id="name" placeholder="Enter reciepent name" className="form-control"/>
  </div>
  <div className="form-group">
    <input type="text" name="name" id="name" placeholder="Enter reciepent name" className="form-control"/>
  </div>
  <div className="form-group">
    <input type="text" name="name" id="name" placeholder="Enter reciepent name" className="form-control"/>
  </div>
  <div className="form-group">
    <input type="text" name="name" id="name" placeholder="Enter reciepent name" className="form-control"/>
  </div>
</form>
      </div>
    </div>
    </Container>
  );
}

export default CheckOut;

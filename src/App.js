import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.checkPassword = this.checkPassword.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.state = {loggedIn: false, userDetails: {}, password: "", username: "", email: ""};  
  }
  render() {
    if (!this.state.loggedIn) {
      return (
        <div className="App">
          <Container>
            <Row>
              <Col xs="4">
                <b>Login with your username or email and password</b>
                <br></br>
                <br></br>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control id="email" type="email" placeholder="Enter email" onChange={e => this.setState({email: e.target.value})} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control id="username" placeholder="Enter Username" onChange={e => this.setState({username: e.target.value})} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" id="password" placeholder="Password" onChange={e => this.setState({password: e.target.value})}/>
                  </Form.Group>
                  <Button variant="primary" type="button" onClick={this.checkPassword}>
                    Login
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <br></br>
                <br></br>
                <h3>Or signup</h3>
                <br></br>
                <br></br>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required id="emailSignup" type="email" placeholder="Enter email" onChange={e => {
                      let userDetails = this.state.userDetails;
                      userDetails.email = e.target.value;
                      this.setState({userDetails: userDetails})}} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required id="usernameSignup" placeholder="Enter Username" onChange={e => {
                      let userDetails = this.state.userDetails;
                      userDetails.username = e.target.value;
                      this.setState({userDetails: userDetails})}} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" id="passwordSignup" placeholder="Password" onChange={e => {
                      let userDetails = this.state.userDetails;
                      userDetails.password = e.target.value;
                      this.setState({userDetails: userDetails})}}/>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required id="firstName" placeholder="First Name" onChange={e => {
                      let userDetails = this.state.userDetails;
                      userDetails.firstName = e.target.value;
                      this.setState({userDetails: userDetails})}}/>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control required id="surname" placeholder="Surname" onChange={e => {
                      let userDetails = this.state.userDetails;
                      userDetails.surname = e.target.value;
                      this.setState({userDetails: userDetails})}}/>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control required type="date" id="dateOfBirth" placeholder="Date Of Birth" onChange={e => {
                      let userDetails = this.state.userDetails;
                      userDetails.dateOfBirth = e.target.value;
                      this.setState({userDetails: userDetails})}}/>
                  </Form.Group>
                  <Button variant="primary" type="button" onClick={this.createUser}>
                    Signup
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <Container>
            <Row>
              <h2>User Details</h2>
              <Col xs="6">
                {["firstName","surname","username","password","email","userId","dateOfBirth"].map((value, index, array) => {
                  return (
                    <p key={index}><b>{value}:</b> {this.state.userDetails[value]} <br></br></p>
                  )
                })}
                <p><b>age:</b> {new Date().getFullYear() - this.state.userDetails.dateOfBirth.split("/")[2]} <br></br></p>
                <Button variant="Danger" type="button" onClick={this.deleteUser}>
                    Login
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
  checkPassword(event) {
    fetch("http://localhost:3001/user/checkPassword",{
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password: this.state.password, username: this.state.username, email: this.state.email})})
        .then(response => response.json())
        .then(data => {
          if (data.success === false) {
            alert(data.message)
          }
          else {
            this.setState({loggedIn: true, userDetails: data})
          }
    });
  }
  deleteUser(event) {
    fetch(`http://localhost:3001/user/deleteByUsername?username=${this.state.userDetails.username}`,{
        method: 'DELETE'})
        .then(data => {
          this.setState({loggedIn: false, userDetails: {}})
    });
  }
  createUser(event) {
    var regex = /[^a-z-A-Z ']/g;
    if (regex.test(this.state.userDetails.firstName) || regex.test(this.state.userDetails.surname)) {
      alert("Name should be letters, spaces, 's and  hyphens only ")
      return;
    }
    fetch("http://localhost:3001/user/create",{
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.userDetails)})
        .then(data => {
          alert("Created user")
    });
  }
}


export default App;

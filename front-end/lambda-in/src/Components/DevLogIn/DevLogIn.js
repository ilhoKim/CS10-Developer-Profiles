import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import '../DevLogIn/DevLogin.css'

export default class DevLogin extends Component {
    state = {
        email: 'abc@xyz.com',
        confirmPassword: ''
      };
      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
      render() {
        return (
          <div className="App">
             <Paper>
              <div className="navBar">
                <div className="leftNavBar">
                  <Button>find Devlopers</Button>
                  <Button>Browse</Button>
                  <Button>profile</Button>
                </div> 
                <div className="rightNavBar">
                  <Button>Billing</Button>
                  <Button>Setting</Button>
                </div> 
              </div>
            </Paper>
    
            <div className="headline">
                <Typography variant="headline" component="h3">
                  Fill-N-Hired
                </Typography>
                <Typography component="p">
                  Our match making starts from here. Fill the most sophisticated resume form and get hired confidently.
                </Typography>
               
            </div>
            
            <div className="formConatiner">
            <Paper >
              <div className="form2">
                
                     {/* look at https://material-ui.com/demos/text-fields/ for documentaition */}
                <Typography variant="headline" component="h3">
                  Log In
                </Typography>
                <TextField
                  id="email"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  margin="normal"
                />
    
                <TextField
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange('confirmPassword')}
                  margin="normal"
                />
    
    
                <Button variant="contained" color="primary">Submit</Button>
                
              </div>
              <div className="signup" >
                <Link to="/signup">
                  <Button className="signup">
                    Register here! 
                  </Button>
                </Link>
              </div>
              </Paper>
            </div>
            
          </div>
        );
    }
}

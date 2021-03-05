import React from 'react'
import {Redirect} from 'react-router-dom'
import axiosInstance from './../../auth/axiosApi.js'
import {sendRegistrationRequest} from './sendRegistrationRequest'
import {Grid, TextField, Button, Link, Typography } from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {withStyles} from '@material-ui/core/styles'
import {DASHBOARD_PAGE_PATH} from './../../api_urls'
import {REGISTRATION_ERROR} from './../../ui_messages'
import Logo from './../../assets/logo.svg'


const useStyles = theme => ({
  body: {
    backgroundColor: theme.palette.white,
    height: '100vh',
    fontFamily: 'Open Sans',
    display: 'flex',
    alignItems: 'center',
    justifyContent:  'center',
    border: 0,
  },
  registerForm: {
    height: '50vh',
    width: '50vh',
    backgroundColor: '',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    margin: '0 0 2rem 0'
  },
  registerWrapper: {
      height: '30vh',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column'
    },
  loginLink: {
    alignSelf: 'center',
    margin: '1rem 0 0 0',
    fontWeight: theme.typography.medium,
    fontSize: theme.typography.body.fontSize
  },
  registerButton: {
    width: 'auto',
    margin: '2rem 0 0 0'
  },
  registerLabel: {
    fontWeight: theme.typography.medium,
    color: theme.palette.grey.main
  },
  textField: {
    margin: '0.5rem 0 0 0'
  }
});

class RegisterScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      email: "",
      succesfulRegistration: false,
      error: {
        status: false,
        message: REGISTRATION_ERROR
        },
      }
    }

  componentDidMount() {
    this._isMounted = true
    if(this._isMounted) {
      }
    }

 registerUser = async(event) => {
    event.preventDefault()
    try {
      const result = await sendRegistrationRequest(this.state.username, this.state.password, this.state.email)
      if(result.status === 201) {
        axiosInstance.defaults.headers['Authorization'] = "Bearer " + result.data.auth_token
        localStorage.setItem('access_token', result.data.auth_token)
        this.setState({succesfulRegistration:true})
      }
    } catch(e) {
      console.log(e)
      this.setState(prevState => ({
        error: {...this.state.error,  status: true }
      }))
    }
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }

  handleUsernameChange = (e) => {
    this.setState({username: e.target.value})
  }

  handlePasswordFormChange = (e) => {
    this.setState({password: e.target.value})
  }

  redirectUser = () => {
    window.location.href = DASHBOARD_PAGE_PATH
  }

  render() {
    const { classes } = this.props
    return (
      <div>
      {this.state.succesfulRegistration ?
        this.redirectUser() :
         <Grid container className={classes.body}>
          <Grid item className={classes.registerForm}>
            {this.state.error.status ?
              <Alert severity="error">{this.state.error.message}</Alert>
              : null }
              <img src={Logo} height="auto" alt="poketrader logo"/>
              <div className={classes.registerWrapper}>
                <div>
                  <TextField variant="outlined" value={this.state.username} placeholder="username"
                           onChange={(e)=>{this.handleUsernameChange(e)}} className={classes.textField}
                           fullWidth autoFocus required />
                 <TextField variant="outlined" value={this.state.email} placeholder="email"
                          type="email" onChange={(e)=>{this.handleEmailChange(e)}} className={classes.textField}
                          fullWidth autoFocus required />
                  <TextField variant="outlined" value={this.state.password} placeholder="password" className={classes.textField}
                           id="password" type="password" onChange={(e)=>{this.handlePasswordFormChange(e)}} fullWidth required />
                    <Button style= {{textTransform: 'capitalize'}} className={classes.registerButton} onClick={this.registerUser} variant="outlined">
                        <Typography className={classes.registerLabel}>
                          Sign up!
                        </Typography>
                      </Button>
                  </div>
                  <Link href="/" className={classes.loginLink}> Already registered? Login instead </Link>
              </div>
          </Grid>
         </Grid>
      }
      </div>
    )
  }
}

export default withStyles(useStyles)(RegisterScreen);

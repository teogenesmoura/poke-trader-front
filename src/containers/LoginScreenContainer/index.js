import React from 'react'
import {Redirect} from 'react-router-dom'
import axiosInstance from './../../auth/axiosApi.js'
import {sendLoginRequest, verifyUserToken, sendRegistrationRequest} from './sendLoginRequest'
import {Grid, TextField, Button, Box, Link, Typography } from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {withStyles} from '@material-ui/core/styles'
import {DASHBOARD_PAGE_PATH} from '../../api_urls'
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
  loginForm: {
    height: '50vh',
    width: '50vh',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
loginWrapper: {
    height: '30vh',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  registerLink: {
    alignSelf: 'center',
    margin: '1rem 0 0 0',
    fontWeight: theme.typography.medium,
    fontSize: theme.typography.body.fontSize
  },
  loginButton: {
    width: 'auto',
    margin: '2rem 0 0 0'
  },
  loginLabel: {
    fontWeight: theme.typography.medium,
    color: theme.palette.grey.main
  },
  textField: {
    margin: '0.5rem 0 0 0'
  }
});

class LoginScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      succesfulLogin: false,
      error: {
        status: false,
        message: "Erro - Nome de usuário ou senha incorretos. Tente novamente."
      },
    }
    this.loginMethod = this.loginMethod.bind(this)
    this.redirectUser = this.redirectUser.bind(this)
  }

  async loginMethod(event) {
    event.preventDefault()
    try {
      const result = await sendLoginRequest(this.state.username, this.state.password )
      if(result.status === 200) {
        axiosInstance.defaults.headers['Authorization'] = "Bearer " + result.data.auth_token
        localStorage.setItem('access_token', result.data.auth_token)
        this.setState({succesfulLogin:true})
      } else {
        this.setState(prevState => ({
          error: {...this.state.error,  status: true }
        }))
      }
    } catch (e) {
      console.log(e)
    }
  }

componentDidMount() {
  this._isMounted = true
  if(this._isMounted) {
    }
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
        {this.state.succesfulLogin ?
          this.redirectUser() :
           <Grid container className={classes.body}>
            <Grid item className={classes.loginForm}>
              {this.state.error.status ?
                <Alert severity="error">{this.state.error.message}</Alert>
                : null }
                <img src={Logo} height="auto" alt="poketrader logo"/>
                <div className={classes.loginWrapper}>
                  <div>
                    <TextField variant="outlined" value={this.state.email} placeholder="username"
                               onChange={(e)=>{this.handleUsernameChange(e)}} className={classes.textField}
                               fullWidth autoFocus required />
                    <TextField variant="outlined" value={this.state.password} placeholder="password" className={classes.textField}
                             id="password" type="password" onChange={(e)=>{this.handlePasswordFormChange(e)}} fullWidth required />
                      <Button style= {{textTransform: 'capitalize'}} className={classes.loginButton} onClick={this.loginMethod} variant="outlined">
                          <Typography className={classes.loginLabel}>
                            Login
                          </Typography>
                        </Button>
                    </div>
                    <Link href="/register" className={classes.registerLink}> Register </Link>
                </div>
            </Grid>
           </Grid>
        }
      </div>
    )
  }
}

export default withStyles(useStyles)(LoginScreen);

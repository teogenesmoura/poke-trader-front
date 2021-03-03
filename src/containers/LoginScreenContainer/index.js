import React from 'react'
import {Redirect} from 'react-router-dom'
import axiosInstance from './../../auth/axiosApi.js'
import {sendLoginRequest, verifyUserToken, sendRegistrationRequest} from './sendLoginRequest'
import {Grid, TextField, Button, Box } from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {withStyles} from '@material-ui/core/styles'

const useStyles = theme => ({
  body: {
    backgroundColor: theme.palette.white,
    height: '100vh',
    fontFamily: 'Open Sans',
    display: 'flex',
    border: 0,
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
  }

  // async verityIfUserIsAlreadyLogged() {
  //   try {
  //     const result = await verifyUserToken( localStorage.getItem('access_token'))
  //     if(result.status === 200) {
  //       this.setState({succesfulLogin:true})
  //     }
  //   } catch(e) {
  //     this.setState({succesfulLogin:false})
  //   }
  // }

  async loginMethod(event) {
    event.preventDefault()
    try {
      const result = await sendLoginRequest(this.state.username, this.state.password )
      if(result.status === 200) {
        axiosInstance.defaults.headers['Authorization'] = "Bearer " + result.data.auth_token
        localStorage.setItem('access_token', result.data.auth_token)
        this.setState({succesfulLogin:true})
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

  render() {
    const { classes } = this.props
    return (
      <div>
        {this.state.succesfulLogin ?
           <div>
            <h1> Logou fera </h1>
           </div> :
           <Grid container className={classes.body}>
            <Grid item className={classes.loginForm}>
            {this.state.error.status ?
              <Alert severity="error">{this.state.error.message}</Alert>
              : null }
              <TextField className={classes.textField} variant="outlined" value={this.state.email} placeholder="email"
                         id="email" type="email" onChange={(e)=>{this.handleUsernameChange(e)}}
                         fullWidth autoFocus required />
              <TextField className={classes.textField} variant="outlined" value={this.state.password} placeholder="senha"
                         id="password" type="password" onChange={(e)=>{this.handlePasswordFormChange(e)}} fullWidth required />
              <Button style= {{textTransform: 'capitalize'}} className={classes.loginButton} onClick={this.loginMethod} variant="contained">Acessar</Button>
            </Grid>
           </Grid>
        }
      </div>
    )
  }
}

export default withStyles(useStyles)(LoginScreen);

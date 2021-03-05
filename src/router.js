import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import Dashboard from "./containers/DashboardContainer"
import LoginScreen from "./containers/LoginScreenContainer"
import RegisterScreen from "./containers/RegisterScreenContainer"
import Content from "./components/Content"
import History from "./components/History"
import {INITIAL_PAGE_PATH, HISTORY_PAGE_PATH, DASHBOARD_PAGE_PATH, REGISTER_USER_PATH} from './api_urls'
import {verifyUserToken} from './api'

class PrivateRouteAuth extends Component{
    constructor(props){
        super(props);
        this.state = {
          isAuthenticaded: false,
          isLoadingPage:"true"
        };
        this.checkIfUserIsAuthenticated = this.checkIfUserIsAuthenticated.bind(this);
    }

    async checkIfUserIsAuthenticated(callback){
        try{
            const response = await verifyUserToken()
            if(response.status === 200){
                console.log("entra em checkIfUserIsAuthenticated com status 200")
                this.setState({isAuthenticaded:true})
            }else{
                console.log("nao entra em checkIfUserIsAuthenticated com status 200")
                this.setState({isAuthenticaded:false});
            }
            callback()
        }catch(error){
            callback();
        }
    };

    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted){

            this.checkIfUserIsAuthenticated( () => {
                this.setState({isLoadingPage:false})
              });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){
        const children = this.props.children;

        //Wait until all informations be fetch until continue
        if(this.state.isLoadingPage) {
            return null;
        }

        return(
            <div>
                {this.state.isAuthenticaded ? children : <Redirect to={"/"} /> }
            </div>
        );
    }

}

const AppRouter = (props) => (
  <Router>
    <Switch>
      <Route exact path={INITIAL_PAGE_PATH}>
        <LoginScreen theme={props.theme}></LoginScreen>
      </Route>
      <Route exact path={REGISTER_USER_PATH}>
        <RegisterScreen theme={props.theme}></RegisterScreen>
      </Route>
      {/*Authenticated routes */}
      <PrivateRouteAuth>
        <Route exact path={DASHBOARD_PAGE_PATH}
                     children={<Dashboard><Content /></Dashboard>}
                     theme={props.theme} />
        <Route exact path={HISTORY_PAGE_PATH}
                     children={<Dashboard><History /></Dashboard>}
                     theme={props.theme} />
      </PrivateRouteAuth>
    </Switch>
  </Router>
);

export default AppRouter

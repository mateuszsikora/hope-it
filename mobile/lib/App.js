import React from 'react';
import { NativeRouter, Route, Redirect, Switch, withRouter, AndroidBackButton } from 'react-router-native'
import moment from 'moment';
import { observer } from 'mobx-react'

import Wall from './components/Wall'
import Survey from './components/Survey'
import PaymentsHistory from './components/PaymentsHistory';
import routes from './routes';
import commonStyles from './components/commonStyles';
import NavFooter from './components/NavFooter';
import MobxDemo from './components/MobxDemo';
import PayConfirm from './components/PayConfirm';
import Login, { loginStore } from './components/Login';
import {
  Container
} from 'native-base';

import PushControllerWithStore from './components/PushControllerWithStore';

moment.locale('pl');

const NavFooterWithRouter = withRouter(NavFooter);

@observer
export default class App extends React.Component {
  loginStore = loginStore;

  render() {
    return (
        <NativeRouter>
          <Container style={commonStyles.container}>
            <PushControllerWithStore/>
            <AndroidBackButton/>
            {!this.loginStore.user.email && <Route path={routes.login} component={Login}/>}
            { this.loginStore.user.email && (
                  <Switch>
                    <Route path={routes.wall} component={Wall}/>
                    <Route path={routes.survey} component={Survey}/>
                    <Route path={routes.payments_history} component={PaymentsHistory}/>
                    <Route path={routes.mobx} component={MobxDemo}/>
                    <Route path={routes.pay} component={PayConfirm}/>
                    <Redirect to={routes.wall}/>
                  </Switch>
              )
            }
            {this.loginStore.user.email && < NavFooterWithRouter onChange={() => null}/> }
          </Container>
        </NativeRouter>
    );
  }
}

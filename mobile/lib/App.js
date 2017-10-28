import React from 'react';
import { NativeRouter, Route, Redirect, Switch, withRouter, AndroidBackButton } from 'react-router-native'
import Wall from './components/Wall'
import PaymentsHistory from './components/PaymentsHistory';
import routes from './routes';
import commonStyles from './components/commonStyles';
import NavFooter from './components/NavFooter';
import MobxDemo from './components/MobxDemo';
import {
  Container
} from 'native-base';

import moment from 'moment';
import PushControllerWithStore from './components/PushControllerWithStore';

moment.locale('pl');

const NavFooterWithRouter = withRouter(NavFooter);



export default class App extends React.Component {

  render() {
    return (
        <NativeRouter>
          <Container style={commonStyles.container}>
            <PushControllerWithStore/>
            <AndroidBackButton/>
            <Switch>
              <Route path={routes.wall} component={Wall}/>
              <Route path={routes.payments_history} component={PaymentsHistory}/>
              <Route path={routes.mobx} component={MobxDemo}/>
              <Redirect to={routes.wall}/>
            </Switch>
            <NavFooterWithRouter onChange={() => null}/>
          </Container>
        </NativeRouter>
    );
  }
}

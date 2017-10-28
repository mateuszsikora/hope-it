import React from 'react';
import { Link } from 'react-router';
import {Sidebar, Menu} from 'semantic-ui-react'

const stylePushable={position:'fixed', top:0, bottom:0}
const stylePusher = {minLeft:250, marginRight: 250};
export default function MainNav() {
  return (
    <Sidebar as={Menu} animation='push'  visible vertical inverted style={stylePushable}>
      <Menu.Item><Link to="/">Home</Link></Menu.Item>
      <Menu.Item><Link to="/add-new-message">Nowa wiadomość</Link></Menu.Item>
      <Menu.Item><Link to="/payments">Dotacje</Link></Menu.Item>
      <Menu.Item><Link to="/payu">Payu</Link></Menu.Item>
    </Sidebar>
  );
}

export function createWithNav(Component){
  function withNav(...props){
    return (
      <div>
        <MainNav/>
        <Sidebar.Pusher style={stylePusher}>
          <Component {...props}/>
        </Sidebar.Pusher>
      </div>
    )
  }

  withNav.displayName = Component.name + withNav.name;

  return withNav;
}

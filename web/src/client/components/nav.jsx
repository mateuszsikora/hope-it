import React from 'react';
import {Link} from 'react-router';
import {Sidebar, Menu, Icon} from 'semantic-ui-react';
import hopeItLogo from '../images/hopeIT_hackaton.png';
import custom from '../styles/custom.css';

const stylePushable = {position: 'fixed', top: 0, bottom: 0};
const stylePusher = {marginLeft: 250, padding: 20};

const iconStyle1= {
  fontSize: 20
};
const iconStyle2= {
  fontSize: 21
};
const logoStyles = {
  position: 'fixed',
  width: '259px',
  bottom: 0,
  zIndex: 9999
};
export default function MainNav() {
  return (
    <div>
      <img style={logoStyles} src={hopeItLogo}/>
      <Sidebar className={custom.sidebar} as={Menu} animation='push' visible vertical inverted style={stylePushable}>
        <Menu.Item><Link to="/"> <Icon name='home' size='large' /> Strona domowa</Link></Menu.Item>
        <Menu.Item><Link to="/add-new-message"><Icon name='mail square' size='large' /> Nowa wiadomość</Link></Menu.Item>
        <Menu.Item><Link to="/payments"> <Icon style={iconStyle2} name='line chart' size='large' /> Dotacje</Link></Menu.Item>
        <Menu.Item><Link to="/surveys"> <Icon style={iconStyle2} name='tasks' size='large' /> Ankiety </Link></Menu.Item>
        <Menu.Item><Link to="/payu"> <Icon style={iconStyle1} name='credit card alternative' size='large' /> PayU</Link></Menu.Item>
      </Sidebar>
    </div>
  );
}

export function createWithNav(Component) {
  function withNav(...props) {
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

import React from 'react';
import { Link } from 'react-router';

export default function MainNav() {
  return (
    <ul role="nav">
      <li><Link to="/">Main</Link></li>
      <li><Link to="/dupa">Dupa</Link></li>
      <li><Link to="/add-new-story">Add new story</Link></li>
      <li><Link to="/add-new-donee">Add new donee</Link></li>
      <li><Link to="/hello">Hello</Link></li>
      <li><Link to="/payments">Payments</Link></li>
    </ul>
  )
}

export function createWithNav(Component){
  function withNav(...props){
    return (
      <div>
        <MainNav/>
        <Component {...props}/>
      </div>
    )
  }

  withNav.displayName = Component.name + withNav.name;

  return withNav;
}

import React from 'react';
import logo from '../images/logo-przyladek.png';
import background from '../images/background.jpg';

const backgroundStyles = {
  backgroundSize: 'cover',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: 'absolute',
  backgroundImage: `url(${background})`,
  backgroundOrigin: 'center',
  overflow: 'hidden'
};

const loginPanelStyles = {
  width: '500px',
  position: 'absolute',
  bottom: '50px',
  left: '50px'
};

const loginPanelBackground = {
  backgroundColor: 'rgba(255,255,255,0.1)'
};

const titleStyles = {
  paddingBottom: '20px',
  textShadow: '0 0 50px #000'
};

const handleSubmit = (event) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  console.log(email, password);
};

export default () => (
  <div style={backgroundStyles} className="ui middle aligned center aligned grid">
    <div style={ loginPanelStyles } className="column">
      <div style={ titleStyles }>
        <div><img src={ logo } className="image"/></div>
        <h2 className="ui teal image header">
          <div className="content">
            Log-in to your account
          </div>
        </h2>
      </div>
      <form className="ui large form" onSubmit={ handleSubmit }>
        <div style={ loginPanelBackground } className="ui stacked segment">
          <div className="field">
            <div className="ui left icon input">
              <i className="user icon" />
              <input type="text" name="email" placeholder="E-mail address"/>
            </div>
          </div>
          <div className="field">
            <div className="ui left icon input">
              <i className="lock icon" />
              <input type="password" name="password" placeholder="Password"/>
            </div>
          </div>
          <button className="ui fluid large teal submit button">Login</button>
        </div>
        <div className="ui error message" />
      </form>
    </div>
  </div>
);

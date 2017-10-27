import React from 'react';
import PropTypes from 'prop-types';
import { Footer, FooterTab, Text, Button } from 'native-base';
import routes from './../routes';

export default function NavFooter({ onChange, location, history }) {
  return (
      <Footer>
        <FooterTab>
          <Button
              active={location.pathname === routes.wall}
              onPress={() => history.push(routes.wall)}
          >
            <Text>Ściana</Text>
          </Button>
          <Button
              active={location.pathname === routes.payments_history}
              onPress={() => history.push(routes.payments_history)}
          >
            <Text>asdas</Text>
          </Button>
        </FooterTab>
      </Footer>
  )
}

NavFooter.propTypes = {
  /** @type {function(string)} */
  onChange: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};
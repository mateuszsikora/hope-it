import React from 'react';
import PropTypes from 'prop-types';
import { Footer, FooterTab, Text, Button } from 'native-base';
import routes from './../routes';
import { store } from './PayConfirm'

export default function NavFooter({ onChange, location, history }) {
  return (
      <Footer>
        <FooterTab>
          <Button
              active={location.pathname === routes.wall}
              onPress={() => location.pathname !== routes.wall && history.push(routes.wall)}
          >
            <Text>Ściana</Text>
          </Button>
          <Button
              active={location.pathname === routes.payments_history}
              onPress={() => location.pathname !== routes.payments_history && history.push(routes.payments_history)}
          >
            <Text>Historia Płatności</Text>
          </Button>
          <Button
              active={location.pathname === routes.mobx}
              onPress={() => location.pathname !== routes.mobx && history.push(routes.mobx)}
          >
            <Text>MobxDemo</Text>
          </Button>
          <Button
              active={location.pathname === routes.pay}
              onPress={handlePay(location, history)}
          >
            <Text>Pay!</Text>
          </Button>
        </FooterTab>
      </Footer>
  )
}

function handlePay(location, history) {
  return () => {
    store.setPayment({
      title: 'Jakaś akcja',
      email: 'todr@gmail.com',
      deviceId: '1', 
      message: null
    })
    return location.pathname !== routes.pay && history.push(routes.pay)
  }
}

NavFooter.propTypes = {
  /** @type {function(string)} */
  onChange: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

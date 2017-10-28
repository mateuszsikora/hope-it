
import axios from 'axios'
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Segment, Label, Message } from 'semantic-ui-react'

export default class Thankyou extends PureComponent {
  componentDidMount () {
    try {
      window.postMessage("close", "")
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    return (
      <Segment>
        <Message
          success
          content={`Twoja płatność została przyjęta.`}
          header='Dziękujemy!'
        />
      </Segment>
    )
  }
}

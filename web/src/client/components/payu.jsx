import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Segment, Label } from 'semantic-ui-react'

const options = [
  { key: '5', value: '5', text: '5 zł'},
  { key: '10', value: '10', text: '10 zł'},
  { key: '20', value: '20', text: '20 zł'},
  { key: '30', value: '30', text: '30 zł'},
  { key: '40', value: '40', text: '40 zł'},
  { key: '50', value: '50', text: '50 zł'},
  { key: '75', value: '75', text: '75 zł'},
  { key: '100', value: '100', text: '100 zł'}
]

function isEmail (email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

const EMAIL = 'Nie wygląda to na poprawny adres e-mail.'
export default class Payu extends PureComponent {
  state = {
    email: '',
    emailValid: EMAIL,
    amount: '10',
    sending: false,
    error: '',
  }

  handleEmail = ev => {
    const email = ev.target.value
    if (isEmail(email)) {
      this.setState({ email, emailValid: '' })
    } else {
      this.setState({ email, emailValid: EMAIL })
    }
  }

  onChange = (ev, data) => {
    const amount = data.value
    this.setState({
      amount
    })
  }

  onAddItem = (ev, data) => {
    const price = data.value.replace(/z[lł]/ig, '').replace(/\s+/g, '')
    if (window.isNaN(parseInt(price, 10))) {
      return;
    }

    options.push({
      key: price,
      value: price,
      text: `${price} zł`
    })
    options.sort((a, b) => parseInt(a.key, 10) < parseInt(b.key, 10))
    this.setState({
      amount: price
    })
  }

  payu = async () => {
    try {
      this.setState({ sending: true })
      let res = await fetch('/api/payu', {
        method: 'post',
        body: JSON.stringify(this.state)
      })
      res = await res.json()
      // all good?
      // TODO [ToDr] Redirect?
      console.log(res)
    } catch (error) {
      console.error(error)
      this.setState({ sending: false, error })
    }
  }

  render() {
    const { email, amount, emailValid, sending, error } = this.state

    return (
      <Segment>
        <Form sending={sending}>
          <Form.Field
            error={!!emailValid}
          >
            <label>E-mail</label>
            <input
              type='email'
              onChange={this.handleEmail}
              value={email}
            />
            { emailValid
              ? <Label pointing basic color='red'>{emailValid}</Label>
              : null
            }
          </Form.Field>
          <Form.Dropdown
            label='Kwota dotacji'
            selection
            allowAdditions
            search
            value={amount}
            options={options}
            onChange={this.onChange}
            onAddItem={this.onAddItem}
          />
          { error
              ? <Message error content={`Nie można wykonać płatności: ${error}`} header='Bład' />
              : null
          }
          <Form.Button
            primary
            onClick={this.pay}
            disabled={!!errorValid}
          >
            Wpłać
          </Form.Button>
        </Form>
      </Segment>
    )
  }
}

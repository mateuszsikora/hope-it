// @flow

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Spinner
} from 'native-base';
import { Link, Redirect } from 'react-router-native';
import { serverUrl } from '../util'
import moment from 'moment';
import MainLoader from './MainLoader';

import { store } from './PayConfirm'
import { loginStore } from './Login'
import { tokenStore } from './PushControllerWithStore'

const margin = {
  marginLeft: 27,
  marginRight: 27
}

class WallFundingEntry extends Component {
  render() {
    return (
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: this.props.msg.image }}/>
              <Body>
              <Text>{this.props.msg.title}</Text>
              <Text note>{moment(this.props.msg.startDate).format('DD-MM-YYYY')}</Text>
              <Text note>Do zdobycia: {this.props.msg.goal}</Text>
              <Text note>Zdobyte: {this.props.msg.raised}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={{ uri: this.props.msg.image }} style={{ height: 200, width: null, flex: 1 }}/>
          </CardItem>
          <CardItem cardBody>
            <Text>{this.props.msg.content}</Text>
          </CardItem>
          <CardItem>
            <Left>
              <Button
                  onPress={this.props.redirectToPayment}
                  transparent>
                <Icon active name="thumbs-up"/>
                <Text>Pomogę</Text>
              </Button>
            </Left>
            <Right>
              <Button transparent>
                <Text>Wsparło: {this.props.msg.supporters}</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
    )
  }
}

class WallMessageEntry extends Component {
  render() {
    return (
        <Card>
          <CardItem>
            <Left>
              <Body>
              <Text>{this.props.msg.title}</Text>
              <Text note>{moment(this.props.msg.date).format('DD-MM-YYYY')}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Text>
              {this.props.msg.content}
            </Text>
          </CardItem>
        </Card>
    )
  }
}

class WallPromoEntry extends Component {
  render() {
    return (
        <Card>
          <CardItem>
            <Left>
              <Body>
              <Text>{this.props.msg.venue} - {this.props.msg.title}</Text>
              <Text note>{moment(this.props.msg.date).format('DD-MM-YYYY')}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Text>
              {this.props.msg.content}
            </Text>
            <Text note>Zniżka: {this.props.msg.discount}</Text>
            <Text note>Kod: {this.props.msg.code}</Text>
          </CardItem>
        </Card>
    )
  }
}

class WithRedirect extends Component {
  state = {
    redirect: false
  }

  redirectToPayment = () => {
    const { _id, title } = this.props.msg

    store.setPayment({
      title,
      email: loginStore.user.email,
      deviceId: tokenStore.token,
      message: _id
    })

    this.setState({
      redirect: true,
    })
  }

  render() {
    const { redirect } = this.state
    if (redirect) {
      return (
          <Redirect to='/pay'/>
      )
    }

    const { Component } = this.props
    return (
        <Component {...this.props} redirectToPayment={this.redirectToPayment}/>
    )
  }
}

class WallContent extends Component {
  state = { messages: [] }

  getMessages = () => {
    return fetch(`${serverUrl}/api/messages`, {
      method: 'GET',
    }).then(res => res.json())
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this.getMessages()
        .then((msg) => {
          this.setState({ messages: msg, isLoading: false})
        })
  }

  render() {
    return (
        <Content>
          <View>
            {this.state.isLoading && (
                <MainLoader/>
              )
            }
            {!this.state.isLoading && this.state.messages.reverse().map((m, i) => {
              switch (m.type) {
                case 'funding':
                  return (<WithRedirect Component={WallFundingEntry} key={i} msg={m}/>)
                case 'message':
                  return (<WithRedirect Component={WallMessageEntry} key={i} msg={m}/>)
                case 'promo':
                  return (<WithRedirect Component={WallPromoEntry} key={i} msg={m}/>)
              }
            })}
          </View>
        </Content>
    );
  }
}

export default function Wall() {
  return (
      <WallContent/>
  )
}

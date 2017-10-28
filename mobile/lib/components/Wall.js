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
  Spinner,
  H1
} from 'native-base';
import { Link, Redirect } from 'react-router-native';
import { serverUrl } from '../util'
import moment from 'moment';
import MainLoader from './MainLoader';

import { store } from './PayConfirm'
import { loginStore } from './Login'
import { tokenStore } from './PushControllerWithStore'

export function formatNumber(num) {
  num = num.toFixed(0)
  return num.split('').reverse().reduce((acc, elem) => {
    const first = acc[0]
    if (first.length === 3) {
      acc.unshift(elem)
    } else {
      acc[0] = `${elem}${acc[0]}`
    }
    return acc
  }, ['']).join(',')
}


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
              <Text note>{moment(this.props.msg.startDate).calendar()}</Text>
              <Text note>Do zdobycia: {formatNumber(this.props.msg.goal)} zł</Text>
              <Text note>Zdobyte: {this.props.msg.raised? formatNumber(this.props.msg.raised) : '0'} zł</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={{ uri: this.props.msg.image }} style={{ height: 200, width: null, flex: 1 }}/>
          </CardItem>
          <CardItem>
            <Text style={{fontSize: 14}}>{this.props.msg.content}</Text>
          </CardItem>
          <CardItem>
            <Left>
              <Button
                  onPress={this.props.redirectToPayment}
                  transparent>
                <Icon active name="thumbs-up"/>
                <Text>POMAGAM</Text>
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
          <CardItem style={{paddingBottom: 0}}>
              <Body style={{flex:1}}>
                <Text note style={{textAlign: 'right', alignSelf: 'stretch'}}>{moment(this.props.msg.date).calendar()}</Text>
              </Body>
          </CardItem>
          <CardItem style={{paddingTop: 0, width: 300}}>
            <Text style={{fontSize: 20}}>{this.props.msg.title}</Text>
          </CardItem>
          <CardItem style={{paddingTop: 0}}>
            <Text style={{fontSize: 14}}>
              {this.props.msg.content}
            </Text>
            <View style={{marginTop: 25}} />
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
              <Body style={{paddingLeft: 0}}>
              <Text style={{paddingLeft: 0, fontSize: 20}}>{this.props.msg.venue} - {this.props.msg.title}</Text>
              </Body>
            </Left>
            <Right>
              <Body>
              <Text note>{moment(this.props.msg.date).calendar()}</Text>
              </Body>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{textAlign: 'center', fontSize: 14}}>
                {this.props.msg.content}
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Body>
                <H1 style={{color: 'green'}}>{formatNumber(this.props.msg.discount)}%</H1>
              <Text>Zniżka</Text>
              </Body>
            </Left>
            <Right>
              <Body>
              <H1 style={{color: 'green', textAlign: 'right'}}>{formatNumber(this.props.msg.donated)}%</H1>
              <Text>Dla Fundacji</Text>
              </Body>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <View style={{flex: 1, alignItems: 'center', alignSelf: 'stretch', }}>
                <Text style={{
                  borderWidth: 1, padding: 12, paddingLeft: 32, paddingRight: 32,
                  color: 'grey', borderColor: 'grey'
                }}>67ASFY78ADSF</Text>
              </View>
            </Body>
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
    this.int = setInterval(() => {
      this.getMessages()
        .then((msg) => {
            if (this.unmounted) {
              return
            }
            this.setState({ messages: msg, isLoading: false })
          })
    }, 3000)
  }

  componentWillUnmount() {
    this.unmounted = true
    clearInterval(this.int)
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

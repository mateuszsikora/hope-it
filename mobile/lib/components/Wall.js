// @flow

import React, { Component } from 'react';
import { View, Image } from 'react-native'; 
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import routes from './../routes';
import { Link } from 'react-router-native';
import { serverUrl } from '../util'
import moment from 'moment';

class WallFundingEntry extends Component {
    render() {
        return (
          <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: this.props.msg.image}} />
                  <Body>
                    <Text>{this.props.msg.title}</Text>
                    <Text note>{moment(this.props.msg.startDate).format('DD-MM-YYYY')}</Text>
                    <Text note>Do zdobycia: {this.props.msg.goal}</Text>
                    <Text note>Zdobyte: {this.props.msg.raised}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri: this.props.msg.image}} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
              <CardItem cardBody>
                <Text>{this.props.msg.content}</Text>
              </CardItem>
              <CardItem>
                <Left>
                  <Button 
                    transparent>
                    <Icon active name="thumbs-up" />
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

class WallContent extends Component {
    state = { messages: [] }

    getMessages = () =>
        fetch(serverUrl + `/api/messages`, {
          method: 'GET',
        }).then(response=>response.json())

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getMessages()
            .then((msg) => {
                this.setState({messages: msg})
            })
    }

    render() {
        return (
            <Content>
                <View>
                    {this.state.messages.map((m, i) => {
                        switch(m.type) {
                            case 'funding':
                                return (<WallFundingEntry key={i} msg={m} />)
                            case 'message':
                                return (<WallMessageEntry key={i} msg={m} />)
                            case 'promo':
                                return (<WallPromoEntry key={i} msg={m} />)
                        }
                    })}
                </View>
            </Content>
        );
    }
}

export default function Wall () {
  return (
      <WallContent />
  )
}

// @flow

import React, { Component } from 'react';
import { View, Image } from 'react-native'; 
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import routes from './../routes';
import { Link } from 'react-router-native';
import { serverUrl } from '../util'

class WallEntry extends Component {
    render() {
        return (
          <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: this.props.msg.image}} />
                  <Body>
                    <Text>{this.props.msg.title}</Text>
                    <Text note>{this.props.msg.date}</Text>
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
                  <Button transparent>
                    <Icon active name="thumbs-up" />
                    <Text>Pomogę</Text>
                  </Button>
                </Left>
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
                    {this.state.messages.map((m, i) => <WallEntry key={i} msg={m} />)}
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

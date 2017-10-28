// @flow

import React, { Component } from 'react';
import { View, Image } from 'react-native'; 
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import routes from './../routes';
import { Link } from 'react-router-native';
import { serverUrl } from '../util'

class SurveyEntry extends Component {
    render({ image, content, title } = props) {
        return (
          <Card>
              <CardItem>
                <Left>
                  <Body>
                    <Text>{msg.title}</Text>
                    <Text note>ma horom curke</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri: msg.image}} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
              <CardItem cardBody>
                <Text>{msg.content}</Text>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon active name="thumbs-up" />
                    <Text>12 Likes</Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent>
                    <Icon active name="chatbubbles" />
                    <Text>4 Comments</Text>
                  </Button>
                </Body>
                <Right>
                  <Text>11h ago</Text>
                </Right>
              </CardItem>
            </Card>
        )
    }
}

class SurveyContent extends Component {
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
                    {this.state.messages.map(m => <SurveyEntry />)}
                </View>
            </Content>
        );
    }
}

export default function Survey () {
  return (
      <SurveyContent />
  )
}

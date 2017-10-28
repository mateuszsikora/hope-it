// @flow

/*
import React, { Component } from 'react';
import { View, Image } from 'react-native'; 
import { DeckSwiper, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import routes from './../routes';
import { Link } from 'react-router-native';
import { serverUrl } from '../util'

const cards = [{
    text: 'Card One',
    name: 'One',
    image: require('./img/hold-on.jpg'),
}, {
    text: 'Card Two',
    name: 'Two',
    image: require('./img/hold-on.jpg'),

}]

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
                    <Text>Ankiety</Text>
                    <DeckSwiper
                        dataSource={cards}
                        renderItem={item =>
                            <Card style={{ elevation: 3 }}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={item.image} />
                                        <Body>
                                            <Text>{item.text}</Text>
                                            <Text note>NativeBase</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image style={{ height: 300, flex: 1 }} source={item.image} />
                                </CardItem>
                                <CardItem>
                                    <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                    <Text>{item.name}</Text>
                                </CardItem>
                            </Card>
                        } />
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
*/


import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
const cards = [
      {
              text: 'Card One',
              name: 'One',
              image: require('./img/hold-on.jpg'),
            },
      {
              text: 'Card Two',
              name: 'One',
              image: require('./img/hold-on.jpg'),
            }
];
export default class DeckSwiperExample extends Component {
      render() {
              return (
                        <Container>
                          <Header />
                          <View>
                            <DeckSwiper
                              dataSource={cards}
                              renderItem={item =>
                                                <Card style={{ elevation: 3 }}>
                                                  <CardItem>
                                                    <Left>
                                                      <Thumbnail source={item.image} />
                                                      <Body>
                                                        <Text>{item.text}</Text>
                                                        <Text note>NativeBase</Text>
                                                      </Body>
                                                    </Left>
                                                  </CardItem>
                                                  <CardItem cardBody>
                                                    <Image style={{ height: 300, flex: 1 }} source={item.image} />
                                                  </CardItem>
                                                  <CardItem>
                                                    <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                                    <Text>{item.name}</Text>
                                                  </CardItem>
                                                </Card>
                                              }
                            />
                          </View>
                        </Container>
                      );
            }
}

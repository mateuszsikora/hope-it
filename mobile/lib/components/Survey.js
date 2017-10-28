// @flow

import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Button, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Right, Body, Icon } from 'native-base';
import { serverUrl } from '../util'

export default class DeckSwiperExample extends Component {
    state = {surveys: [
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
    ]}
    getSurveys = () =>
        fetch(serverUrl + `/api/surveys`, {
          method: 'GET',
        }).then(response=>response.json())

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.getSurveys()
            .then((msg) => {
                this.setState({surveys: msg})
            })
    }
      render() {
              return (
                        <Container>
                          <Header />
                          <View>
                            <DeckSwiper
                              dataSource={this.state.surveys}
                              renderItem={item =>
                                                <Card style={{ elevation: 3, backgroundColor: 'red' }}>
                                                  <CardItem>
                                                    <Left>
                                                      <Body>
                                                        <Text>{item.pool}</Text>
                                                        <Text note>Ankiety</Text>
                                                      </Body>
                                                    </Left>
                                                  </CardItem>
                                                  <CardItem cardBody>
                                                    <Text>
                                                        {item.question}
                                                    </Text>
                                                  </CardItem>
                                                  <CardItem>
                                                    <Left>
                                                      <Button 
                                                        transparent>
                                                        <Icon active name="thumbs-up" />
                                                        <Text>Tak</Text>
                                                      </Button>
                                                    </Left>
                                                    <Right>
                                                      <Button 
                                                        transparent>
                                                        <Icon active name="thumbs-down" />
                                                        <Text>Nie</Text>
                                                      </Button>
                                                    </Right>
                                                  </CardItem>
                                                </Card>
                                              }
                            />
                          </View>
                        </Container>
                      );
            }
}

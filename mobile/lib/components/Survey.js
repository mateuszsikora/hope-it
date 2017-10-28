// @flow

import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Button, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Right, Body, Icon } from 'native-base';
import { serverUrl } from '../util'

export default class DeckSwiperExample extends Component {
    state = {swipe: {},surveys: [
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

    postAnswer = (survey, answear) =>
        fetch(serverUrl + `/api/answears`, {
          method: 'POST',
            headers: new Headers({
              "Content-Type": "application/json"
            }),
          body: JSON.stringify({
              survey: survey._id,
              answear: answear
          })
        })

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.getSurveys()
            .then((msg) => {
                this.setState({surveys: msg})
            })
    }
    swipeRight = () => {
        this.postAnswer(this.deck._root.state.selectedItem, false)
    }

    swipeLeft = () => {
        this.postAnswer(this.deck._root.state.selectedItem, true)
    }
      render() {
              return (
                        <Container>
                          <Header />
                          <View>
                            { !this.state.surveys.length && (
                              <Text style={{fontSize: 28,textAlign: 'center',marginTop:75,marginRight:20,marginLeft: 20}}>
                                Żadne ankiety nie są jeszcze dostępne.
                              </Text>
                            )}
                            <DeckSwiper
                              ref={(deck) => this.deck = deck}
                              onSwipeRight={this.swipeRight}
                              onSwipeLeft={this.swipeLeft}
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

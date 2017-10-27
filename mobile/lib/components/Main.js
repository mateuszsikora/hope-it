import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Link } from 'react-router-native'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Icon, Left } from 'native-base';
import NavFooter from './NavFooter';
import routes from './../routes';
import commonStyles from './commonStyles';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  },
  text: {
    color: '#000000',
    fontSize: 15
  },
  linkListContainer: { flex: 1, flexDirection: 'row', alignItems: 'center' }
});

export default function Main() {
  return (
      <Container style={commonStyles.container}>
        <Content>
          <List>
            <ListItem>
              <Link
                  to={routes.wall}
                  underlayColor='#f0f4f7'
                  style={styles.navItem}>
                <View style={styles.linkListContainer}>
                  <Icon name="home"/>
                  <Text>Airplane Mode</Text>
                </View>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                  to={routes.wall}
                  underlayColor='#f0f4f7'
                  style={styles.navItem}>
                <View style={styles.linkListContainer}>
                  <Icon name="home"/>
                  <Text>Notifications</Text>
                </View>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                  to="/payments_history"
                  underlayColor='#f0f4f7'
                  style={styles.navItem}>
                <View style={styles.linkListContainer}>
                  <Icon name="home"/>
                  <Text>Historia Płatności</Text>
                </View>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                  to="/mobx"
                  underlayColor='#f0f4f7'
                  style={styles.navItem}>
                <View style={styles.linkListContainer}>
                  <Icon name="home"/>
                  <Text>MobxDemo</Text>
                </View>
              </Link>
            </ListItem>
          </List>
        </Content>
      </Container>
  );
}

import { AppRegistry } from 'react-native';
import App from './lib/App';

global.PaymentRequest = require('react-native-payments').PaymentRequest
AppRegistry.registerComponent('hopeit', () => App);

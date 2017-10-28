import generateUsers from './users';
import generateDonors from './donors';
import generatePayments from './payments';
import generateMessages from './messages';

module.exports = () => {
  generateUsers().then(generateDonors).then(generateMessages).then(generatePayments);
};

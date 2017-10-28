import generateUsers from './users';
import generateDonors from './donors';
import generatePayments from './payments';
import generateEvent from './event';

module.exports = () => {
  generateUsers().then(generateDonors).then(generateEvent).then(generatePayments);
};

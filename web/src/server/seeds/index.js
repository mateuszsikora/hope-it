import generateUsers from './users';
import generateDonors from './donors';
import generatePayments from './payments';

module.exports = () => {
  generateUsers().then(()=>generateDonors()).then(()=>generatePayments());
};

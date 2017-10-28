import generateUsers from './users';
import generateDonors from './donors';
import generatePayments from './payments';
import generateMessages from './messages';
import generateSurveys from './surveys';
import generateAnswears from './answears';

module.exports = () => {
  generateUsers()
  .then(generateDonors)
  .then(generateMessages)
  .then(generatePayments)
  .then(generateSurveys)
  .then(generateAnswears)
};

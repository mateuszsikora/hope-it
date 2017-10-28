import Survey from '../api/survey/survey.schema';

module.exports = async () => {
  await Survey.find({}).remove();
  await Survey.create([{
      question: 'Ala ma kota?',
      pool: 'Nokia'
    }, {
        question: 'Kota ma Ala?',
        pool: 'Nokia'
    }, {
        question: 'Kto ma kota?',
        pool: 'Nokia'
    }, {
        question: 'Kogo ma kot?',
        pool: 'Nokia'
    }, {
        question: 'Jak na imię ma kot?',
        pool: 'Nokia'
    }, {
        question: 'Jak na imię ma Ala?',
        pool: 'Nokia'
    }, {
        question: 'Kota ma Ala?',
        pool: 'Nokia'
    }, {
        question: 'Ile lat ma kot?',
        pool: 'Nokia'
    }, {
        question: 'Czym zajmuje się kot?',
        pool: 'Provider1'
    }, {
        question: 'Kota ma Ala?',
        pool: 'Provider1'
    }]);
    console.log('finished populating surveys');
  };

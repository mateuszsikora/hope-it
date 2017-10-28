import Message from '../api/message/message.schema';
import Donor from '../api/donor/donor.schema';
import moment from 'moment';
import fs from 'fs';
import path from 'path';

const imageData1 = fs.readFileSync(path.resolve(__dirname, 'images', 'edward-scissorhands-jack-sparrow.jpg'));
const exampleImage1 = new Buffer(imageData1).toString('base64');

module.exports = async () => {
  const donors = await Donor.find({});
  await Message.find({}).remove();
  await Message.create([{
      donors: donors,
      type: 'message', //'funding'|'promo'|'message'
      date: new Date(), // promo | message
      title: "Dzięki 1!!!",
      content: "Pięć wieków później w później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z ",
      shortContent: "Pięć wieków później w później",
      image: exampleImage1
    }, {
        donors: [donors[1], donors[2]],
        type: 'message', //'funding'|'promo'|'message'
        date: moment().subtract(2, 'days').toDate(), // promo | message
        title: "Dzięki 2!!!",
        content: "Pięć wieków później w później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z ",
        shortContent: "Pięć wieków później w później",
        image: exampleImage1
    }, {
        donors: [donors[0]],
        type: 'message', //'funding'|'promo'|'message'
        date: moment().subtract(2, 'month').toDate(), // promo | message
        title: "Dzięki 3!!",
        content: "Pięć wieków później w później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z ",
        shortContent: "Pięć wieków później w później",
      }, {
        donors: donors,
        type: 'funding', //'funding'|'promo'|'message'
        endDate: moment().add(5, 'days').toDate(), //funding
        goal: 1000000,
        raised: 1000,
        title: 'Pomocy dla mateusza...',
        content: 'Chłopak strasznie chce spać, marchewka jest lepsza',
        shortContent: 'Nie śpi bo trzyma laptopa',
        image: exampleImage1
      }, {
        donors: [donors[1]],
        type: 'funding', //'funding'|'promo'|'message'
        endDate: moment().add(5, 'days').toDate(), //funding
        goal: 1000000,
        raised: 1000,
        title: 'Chciał bym kupić marchewki',
        content: 'Brakuje chajsu na marchewki które musimy kupić',
        shortContent: 'co z tymi marchewkami',
        image: exampleImage1
      }
  ]);
  console.log('finished populating messages');
};

import Donor from '../api/donor/donor.schema';

module.exports = async () => {
  await Donor.find({}).remove({});
  await Donor.create({
      email: 'marian@marian.com',
      deviceId: 'asdf'
    }, {
      email: 'macio@macio.sex',
      deviceId: 'asdf2'
    }, {
      email: 'maciooo@macio.sex',
      deviceId: 'asdf4'
    });
    console.log('finished populating donors');
};

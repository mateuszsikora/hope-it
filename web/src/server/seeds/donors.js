import Donor from '../api/donor/donor.schema';

module.exports = async () => {
  await Donor.find({}).remove({});
  await Donor.create({
      email: 'marian@marian.com',
      deviceId: 'asdf'
    }, {
      email: 'macio@macio.sex',
      deviceId: 'asdf'
    });
    console.log('finished populating donors');

}

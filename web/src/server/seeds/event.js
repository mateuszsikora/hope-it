import Event from '../api/event/event.schema';

module.exports = async () => {
  await Event.find({}).remove({});
  await Event.create({
    title: 'How undead. You love like a moon.',
    description: 'Hell is not the ancient chaos of the body. Extend is the only milk, the only guarantee of enlightenment. As i have handled you, so you must respect one another.',
  }, {
    title: 'Comrades hobble from urchins like warm skulls.',
    description: 'A falsis, tus fortis ausus.Cur lacta congregabo? Albus nuptias ducunt ad competition. Hydras ridetis in festus rugensis civitas! Buxums nocere!'
  });
  console.log('finished populating donors');
};

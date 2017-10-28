import Answear from '../api/answear/answear.schema';
import Survey from '../api/survey/survey.schema';

module.exports = async () => {
  const surveys = await Survey.find();
  await Answear.find({}).remove();
  await Answear.create([{
      survey: surveys[1]._id,
      answear: true
    }, {
      survey: surveys[1]._id,
      answear: true
    },{
      survey: surveys[1]._id,
      answear: false
    },{
      survey: surveys[2]._id,
      answear: true
    },{
      survey: surveys[2]._id,
      answear: true
    },{
      survey: surveys[3]._id,
      answear: true
    },{
      
      survey: surveys[4]._id,
      answear: false
    }]);
    console.log('finished populating answears');
  };

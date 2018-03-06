import {
  numberEngineSuite,
  numberFormatSuite,
  numberFormatBaselineSuite,
  numberParseSuite
} from './numbers';

const options = { async: false, delay: 0.5 };

numberEngineSuite.run(options);
numberFormatBaselineSuite.run(options);
numberFormatSuite.run(options);
numberParseSuite.run(options);
import Validator from 'fastest-validator';

import getAccountSchema from './account';

export default new Validator().compile(getAccountSchema());

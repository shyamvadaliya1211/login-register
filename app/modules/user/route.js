const cors = require('cors');
const userCtrl = require('./controller');


/**
 * Init route
 * @param  {[object]} app [expressJS app object]
 * @return {[null]}     [null]
 */
exports.init = (app) => {
	app.post('/api/v1/user/register', userCtrl.register);
};
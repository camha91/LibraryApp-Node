const log4js = require('log4js');

let defaultLevel = 'info';

console.log('https://libraryapp-urmgm.run-us-west2.goorm.io');
console.log(`log default level is :  ${defaultLevel}`);

log4js.configure({
	levels: { info: { value: 20000, colour: 'green' } },
	appenders: { err: { type: 'stderr' } },
	categories: { default: { appenders: ['err'], level: defaultLevel } }
});

const getLogger = log4js.getLogger;
const connectLogger = log4js.connectLogger;

module.exports = {
	getLogger,
	connectLogger,
	expressLogger: log4js.connectLogger(log4js.getLogger('express'), {
		level: log4js.levels.INFO,
		format: (req, res, format) => format(`":method :url"\n_query: ${JSON.stringify(req.query)}\n_body(post method only): ${JSON.stringify(req.body)}`)
	})
};
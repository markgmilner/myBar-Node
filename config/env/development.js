'use strict';

module.exports = {
	db: 'mongodb://localhost/myBar',
	app: {
		title: 'myBar'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '318994911271-dtbdtj2on01ot8ii3ub2jknsmshr36k6.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'GIJ0NDDfkaCItyu4KM911rMn',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};

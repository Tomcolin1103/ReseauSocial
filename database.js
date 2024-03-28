const { DB_USER, DB_PSW, DB_NAME } = process.env;

const sqlConfig = {
	user: DB_USER,
	password: DB_PSW,
	database: DB_NAME,
	server: "localhost",
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 300000,
	},
	options: {
		trustServerCertificate: true,
	},
};

module.exports = sqlConfig;

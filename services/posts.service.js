const sql = require("mssql");
const sqlConfig = require("../database");

const postsService = {
	getAll: async () => {
		try {
			await sql.connect(sqlConfig);
			const request = new sql.Request();
			const result =
				await request.query(`SELECT pseudo, P.content, CONVERT(VARCHAR, P.[date], 6) AS [date]
												FROM Users U JOIN Posts P
												ON U.id = P.userId`);
			if (result.recordset.length > 0) {
				return result;
			}
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
};

module.exports = postsService;

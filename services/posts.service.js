const sql = require("mssql");
const sqlConfig = require("../database");

const postsService = {
	getAll: async () => {
		try {
			await sql.connect(sqlConfig);
			const request = new sql.Request();
			const result =
				await request.query(`SELECT pseudo, P.content, CONVERT(VARCHAR, P.[date], 6) AS [date], P.postId
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
	getById: async (postId) => {
		try {
			await sql.connect(sqlConfig);
			const request = new sql.Request();
			const result =
				await request.query`SELECT pseudo, P.content, CONVERT(VARCHAR, P.[date], 6) AS [date]
								FROM Users U JOIN Posts P
								ON U.id = P.userId
								WHERE postId = ${postId}`;

			const comments =
				await sql.query`SELECT U.pseudo, C.content, CONVERT(VARCHAR, C.date, 6) AS date
											FROM Comments C JOIN Users U
											ON U.id = C.userId
											JOIN Posts P
											ON P.postId = C.postId
											WHERE P.postId = ${postId}`;
			if (result.recordset) {
				return [result.recordset[0], comments.recordset];
			}
			return null;
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
	comment: async (data) => {
		try {
			await sql.connect(sqlConfig);
			const request = new sql.Request();
			const result = await request
				.input("content", sql.VarChar, data.content)
				.input("postId", sql.Int, data.postId)
				.input("userId", sql.Int, data.userId)
				.query(
					"INSERT INTO Comments (content, date, postId, userId) VALUES (@content, GETDATE(), @postId, @userId)"
				);
			return result;
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
};

module.exports = postsService;

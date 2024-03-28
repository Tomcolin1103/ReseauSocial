const sql = require("mssql");
const sqlConfig = require("../database");
const bcrypt = require("bcrypt");

const usersService = {
	register: async (data) => {
		try {
			const { email, hashedPassword, pseudo } = data;
			await sql.connect(sqlConfig);
			const request = new sql.Request();

			const userExists = await request
				.input("email", sql.NVarChar, email)
				.query("SELECT * FROM users WHERE email = @email");

			if (userExists.recordset.length > 0) {
				throw new Error("An account already exists with this email address");
			}

			const insertNewUser = await request
				.input("hashedPassword", sql.NVarChar, hashedPassword)
				.input("pseudo", sql.NVarChar, pseudo)
				.query(
					"INSERT INTO users (email, hashedPassword, pseudo) VALUES (@email, @hashedPassword, @pseudo)"
				);

			return insertNewUser;
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
	login: async (email, password) => {
		try {
			await sql.connect(sqlConfig);
			const request = new sql.Request();
			const result = await request
				.input("email", sql.NVarChar, email)
				.query("SELECT * FROM users WHERE email = @email");

			if (result.recordset.length > 0) {
				const user = result.recordset[0];
				const matchPassword = bcrypt.compareSync(password, user.hashedPassword);
				if (matchPassword) {
					return user;
				}
			}

			return null;
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
	updateJwt: async (id, jwt) => {
		try {
			await sql.connect(sqlConfig);
			const request = new sql.Request();

			const result = await request
				.input("id", sql.Int, id)
				.input("jwt", sql.NVarChar, jwt)
				.query("UPDATE users SET JWT = @jwt WHERE id = @id");
			return result.rowsAffected[0] > 0;
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
	getAll: async () => {
		try {
			await sql.connect(sqlConfig);

			const result = await sql.query`SELECT * FROM users`;
			if (result.recordset.length > 0) {
				return result.recordset;
			}
		} catch (err) {
			console.error(err);
		}
	},
};

module.exports = usersService;

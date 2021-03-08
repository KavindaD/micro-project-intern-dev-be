const mysql = require('mysql')
const dotenv = require('dotenv')
let instance = null
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

connection.connect((err) => {
    if(err) {
        console.log(err.message)
    }
    console.log('db ' + connection.state)
})

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService()
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM user;"
                connection.query(query, (err, results) => {
                    if(err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async insertNewData(newDetails) {
        try{
            const username = newDetails.username
            const email = newDetails.email
            const contact_number = newDetails.contactNumber
            const password = newDetails.password
            
            const insertID = await new Promise((resolve, reject) => {
                const query = "INSERT INTO user (username,email,contact_number,password) VALUES (?,?,?,?);"
                connection.query(query, [
                    username,
                    email,
                    contact_number,
                    password
                ], (err, result) => {
                    if(err) reject(new Error(err.message))
                    resolve(result)
                })
            })
            console.log(insertID)
        }catch(error) {
            console.log(error)
        }
    }
    async deleteRowById(id) {
        try{
            id = parseInt(id, 10)
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM user WHERE id = ?"

                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result)
                })
            })
        return response === 1 ? true : false
        } catch(error) {
            console.log(error)
            return false
        }
    }
    async updateRowById(admin) {
        try {
            const id = admin.id
            const username = admin.username
            const email = admin.email
            const contact_number = admin.contact_number
            const password = admin.password

            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE user SET username = ?, email = ?, contact_number = ?, password = ? WHERE id = ?"
                connection.query(query, [username, email, contact_number, password, id], (err, result) => {
                    if(err) reject(new Error(err.message))
                    resolve(result)
                })
            })
            console.log(response)
        }catch(error) {
            console.log(error)
            return false
        }
    }
}

module.exports = DbService
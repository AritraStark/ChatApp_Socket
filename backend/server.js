import express from 'express';
import dotenv from 'dotenv';
import path from 'path'


//.env file initialize
dotenv.config();

const app = express();

app.use(express.json())

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

const PORT = process.env.PORT || 5000

//server listening on idle port
app.listen(
    PORT, console.log(`Server running in ${ process.env.NODE_ENV } at port ${ PORT }`)
)
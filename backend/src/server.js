import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;

app.use(bodyParser.json());


app.get('/api/articles/:name', async (req, res) => {
  console.log(req.params.name);
  let articleName = req.params.name;
  
  try {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true });
    const db = client.db('my-blog');
    const articleInfo = await db.collection('articles').findOne({ name: articleName });
    res.status(200).json(articleInfo);
    client.close();
  } catch (error) {
    res.status(500).json({message: 'Error connecting to db', error})
  }
});


app.get('/', (req, res) => {
  res.status(200).send(`Hello`);
});

// app.post('/api/articles/:name/upvote', (req, res) => {
//   console.log(req.params.name);
//   console.log(typeof req.params.name);
//   const articleName = req.params.name;

//   console.log(articlesInfo[articleName]);
//   articlesInfo[articleName].upvotes += 1;
//   res.status(200).send(`${articleName} has got ${articlesInfo[articleName].upvotes} upvotes`);
// });

// app.post('/api/articles/:name/add-comment', (req, res) => {
//   const { username, text } = req.body;
//   console.log({ username, text });
//   const articleName = req.params.name;
//   console.log(articleName);
//   console.log(articlesInfo[articleName]);
//   articlesInfo[articleName].comments.push({ username, text });
//   res.status(200).send(articlesInfo[articleName]);
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
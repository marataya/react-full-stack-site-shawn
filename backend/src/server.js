import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;

app.use(bodyParser.json());


const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true });
    const db = client.db('my-blog');

    await operations(db)

    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to db', error })
  }
}


app.get('/', async (req, res) => {
  res.send('Hello World!');
});


app.get('/api/articles/:name', async (req, res) => {
  withDB(async (db) => {
    let articleName = req.params.name;
    const articleInfo = await db.collection('articles').findOne({ name: articleName });
    res.status(200).json(articleInfo);
  }, res)
});


app.post('/api/articles/:name/upvote', async (req, res) => {
  withDB(async (db) => {
    let articleName = req.params.name;
    const articleInfo = await db.collection('articles').findOne({ name: articleName });
    await db.collection('articles').updateOne({ name: articleName }, { $set: { upvotes: articleInfo.upvotes + 1 } });
    const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
    res.status(200).json(updatedArticleInfo);
  }, res)
});

app.post('/api/articles/:name/add-comment', (req, res) => {
  withDB(async (db) => {
    const { username, text } = req.body;
    const articleName = req.params.name;
    
    const articleInfo = await db.collection('articles').findOne({ name: articleName });
    await db.collection('articles').updateOne({ name: articleName }, { $set: { comments: articleInfo.comments.concat({username, text}) } });
    const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
    res.status(200).json(updatedArticleInfo);
  }, res)
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
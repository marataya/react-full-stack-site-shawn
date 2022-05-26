import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import ArticleList from '../components/ArticleList';
import CommentsList from '../components/CommentsList';
import { articles } from './article-content';
import UpvotesSection from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';

const ArticlePage = ({ match }) => {

  const params = useParams();
  const name = params.name
  const article = articles.find(article => article.name === params.name);

  const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: []});
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      console.log(body)
      setArticleInfo(body);
    }
    fetchData();
  }, [name]);


  if (!article) return <h1>Article doesn't exist</h1>
  const otherArticles = articles.filter(article => article.name !== name)
  return (
    <div>
      <h1>{article.title}</h1>
      <UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo}/>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      <CommentsList comments={articleInfo.comments} /> 
      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/>
      <ArticleList articles={otherArticles}/>
    </div>
  )
}

export default ArticlePage
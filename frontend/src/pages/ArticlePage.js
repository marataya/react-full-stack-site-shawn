import React from 'react'
import { useParams } from 'react-router-dom'
import ArticleList from '../components/ArticleList';
import { articles } from './article-content';

const ArticlePage = ({ match }) => {
  let params = useParams();
  let article = articles.find(article => article.name === params.name);

  if (!article) return <h1>Article doesn't exist</h1>
  const otherArticles = articles.filter(article => article.name !== params.name)
  return (
    <div>
      <h1>{article.title}</h1>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      <ArticleList articles={otherArticles}/>
    </div>
  )
}

export default ArticlePage
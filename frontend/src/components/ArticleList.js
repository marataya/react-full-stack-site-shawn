import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color:#ff00aa;
  border-bottom: 1px solid black;
`


const ArticleList = ({ articles }) => {
  return (
    <>{articles.map(article => (
      <StyledLink to={`/article/${article.name}`}><div key={article.name}>
        <h1>{article.title}</h1>
        <p>{article.content[0].substring(0, 150)+" ... "}</p>
      </div>
      </StyledLink>
    ))}</>
  )
}

export default ArticleList
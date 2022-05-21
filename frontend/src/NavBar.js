import React from 'react'
import { Link } from 'react-router-dom'
import { AboutPage } from './pages/AboutPage'
import ArticlePage from './pages/ArticlePage'
import ArticlesListPage from './pages/ArticlesListPage'
import HomePage from './pages/HomePage'
import styled from 'styled-components'

const NavLink = styled(Link)`
  width: 33%;
  // color: inherit;
  padding: 10px 20px;
  text-decoration: none;
  text-align:center;
  border-radius: 5px;
  &:hover {
    background-color:black;
    color: white;
  }
`;

const NavBar = () => {
  return (
    <nav style={{display: "flex", flexDirection: "row", justifyContent: "space-around", borderBottom: "solid 3px", fontWeight: "600"}}>
        <NavLink to="/" activeStyle={{color: 'red'}}>Home Page</NavLink>
        <NavLink to="/about" activeStyle={{color: 'red'}}>About</NavLink>
        <NavLink to="/articles-list" activeStyle={{color: 'red'}}>Articles List</NavLink>
    </nav>
  )
}

export default NavBar
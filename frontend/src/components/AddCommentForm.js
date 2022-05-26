import React, { useState } from 'react'

const AddCommentForm = ({articleName, setArticleInfo}) => {

  const [username, setUsername] = useState('');
  const [commentText, setComment] = useState('');

  const addComment = async () => {
    const result = await fetch(`/api/articles/${articleName}/add-comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        text: commentText,
      }),
    });
    const body = await result.json();
    setArticleInfo(body);
    setUsername('');
    setComment('');
  }

  return (
    <div id='add-comment-form'>
      <h3>Add a comment</h3>
      <label>
        Name:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}></input>
      </label>
      <label>
        <textarea rows="4" cols="50" value={commentText} onChange={e => setComment(e.target.value)} />
      </label>
      <button onClick={() => addComment()}>Add comment</button>
    </div>
  )
}

export default AddCommentForm
import React from 'react';

const CommentsList = ({ comments }) => (
  <>
    {
      comments.map((comment, key) => (
        <div className='comment' key={key}>
          <h4>{comment.username}</h4>
          <p>{comment.text}</p>
        </div>
      ))}
  </>
);

export default CommentsList;

import React from 'react'
import PostItem from "./PostItem";
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
const PostList = ({postItem, title, remove}) => {
if (!postItem.length) {
return(
<h1 style={{textAlign: "center"}}>
  Posts didn't find!
</h1>
)
}
  
  return (
    <div>	
    <h1 style={{ textAlign: "center" }}>
        {title}
        </h1>
        <TransitionGroup> 
            {postItem.map((posts,index) => 
              <CSSTransition
                key={posts.id}
                timeout={500}
                classNames="post"
              >
                <PostItem remove={remove} number = {index+1} post={posts}  />
 
              </CSSTransition>       
    )}
        </TransitionGroup>
    </div>
  );
};

export default PostList
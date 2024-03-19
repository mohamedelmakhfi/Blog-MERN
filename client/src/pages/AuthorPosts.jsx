import React, { useState } from "react";
import { DUMMY_POSTS } from "../data";
import PostItem from "../components/PostItem";

const AuthorPosts = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  return (
    <section className="author-posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(({ id, thumbnail, authorID, category, title, desc }) => (
            <PostItem
              key={id}
              postId={id}
              thumbnail={thumbnail}
              authorID={authorID}
              category={category}
              title={title}
              desc={desc}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No posts Founds</h2>
      )}
    </section>
  );
};

export default AuthorPosts;

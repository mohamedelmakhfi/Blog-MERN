import React, { useState } from "react";
import { Link } from "react-router-dom";

const authorsData = [
  {
    id: 1,
    avatar: "url_de_l_avatar_1",
    name: "John Doe",
    posts: 10,
  },
  {
    id: 2,
    avatar: "url_de_l_avatar_2",
    name: "Jane Smith",
    posts: 20,
  },
  {
    id: 3,
    avatar: "url_de_l_avatar_3",
    name: "Alice Johnson",
    posts: 15,
  },
  {
    id: 4,
    avatar: "url_de_l_avatar_4",
    name: "Bob Brown",
    posts: 8,
  },
  {
    id: 5,
    avatar: "url_de_l_avatar_5",
    name: "Emily Davis",
    posts: 12,
  },
];

const Authors = () => {
  const [authors, setAuthors] = useState(authorsData);

  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors__container">
          {authors.map(({id, avatar, name, posts}) => {
            return (
              <Link key={id} to={`/posts/users/${id}`} className="author">
                <div className="author__avatar">
                  <img src={avatar} alt={`image of ${name}`} />
                </div>
                <div className="author__info">
                  <h4>{name}</h4>
                  <p>{posts} posts</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className="center"> No Users/authors Founds</h2>
      )}
    </section>
  );
};

export default Authors;

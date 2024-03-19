import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "../components/PostAuthor";

const PostDetail = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor />
          <div className="post-detail__buttons">
            <Link to={`/posts/werwer/edit`} className="btn sm primary">
              Edit
            </Link>
            <Link to={`/posts/werwer/delete`} className="btn sm danger">
              Delete
            </Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className="post-detail__thumbnail">
          <img src="" alt="post_detail" />
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore quos
          tenetur explicabo dicta cupiditate, magni, unde similique animi
          mollitia libero ipsa! Quidem eaque a soluta eius deleniti sunt
          repellendus! Repellat voluptatem tempora dignissimos neque earum rerum
          saepe est accusantium culpa.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
          necessitatibus officiis. Ab illum vero asperiores totam alias aliquid,
          repudiandae debitis quisquam possimus omnis veniam vel fugiat sint
          minus dolorem cumque voluptas quia aut expedita optio tempora? Enim,
          optio sed. Sunt quod, laborum obcaecati molestiae minus nesciunt magni
          tenetur nobis non ipsum beatae quas! Atque, incidunt.
        </p>
        <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
        perspiciatis aut natus doloribus ullam debitis vero voluptates mollitia
        provident consequatur nisi autem vel, sit dolorem quaerat odio quisquam
        amet laudantium numquam cupiditate. Id sequi saepe consequuntur
        pariatur, cumque veniam et odio autem consequatur dolore iure laudantium
        vero voluptatem quo libero numquam dolor repellat. Eveniet itaque cum et
        perspiciatis! Ratione molestias saepe sit suscipit ex. Voluptatem
        commodi illum delectus velit accusamus aut mollitia et sint
        perspiciatis, temporibus tenetur corporis beatae soluta aliquid.
        Aspernatur, ipsum quisquam consequatur odit, accusantium hic eaque
        repellat illum at minima consequuntur exercitationem, inventore maxime
        recusandae corrupti id eligendi. Ullam, nemo unde magnam tempore et
        omnis dolore minima sequi?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
          sed excepturi illum cum culpa accusamus architecto officia modi quasi
          libero.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo
          architecto eligendi quod cum amet qui reprehenderit, illum officiis
          sequi, vero ipsa doloremque placeat, at repudiandae? Delectus maxime
          odit tempore harum quis, similique aliquam illo sint iusto corrupti
          pariatur assumenda fugit in? Sunt facilis, enim ex, ullam delectus nam
          sapiente quasi culpa dolores mollitia quam numquam similique qui.
          Repellat totam explicabo delectus odit mollitia similique autem?
          Beatae quidem possimus dicta nisi accusantium, optio aliquid omnis
          ipsa laudantium reiciendis voluptas adipisci sint nulla itaque
          cupiditate esse placeat quod obcaecati quia animi aperiam. Totam sed
          temporibus debitis suscipit tempora nesciunt ipsam, aut atque
          exercitationem nihil, nisi minus veniam repellendus. Accusantium rem
          soluta fuga corrupti, voluptate nihil quidem ab porro debitis
          voluptatum modi ratione, consequuntur ad est ea? Fugiat, impedit
          harum. Id reprehenderit libero optio. Soluta quis ipsum nulla deleniti
          minima dolores corporis eum temporibus mollitia, nostrum cum odit rem
          obcaecati, illum, quisquam non illo culpa similique deserunt odio
          inventore. Nostrum eos itaque, ea nam natus deleniti repellat dolor
          debitis officia quia ab autem recusandae deserunt facilis eius
          consequatur molestias in rem quasi odio iste dignissimos! Impedit,
          distinctio a tenetur est esse iusto. Eos facere adipisci optio quos a
          vitae cupiditate labore. Sapiente, culpa.
        </p>
      </div>
    </section>
  );
};

export default PostDetail;

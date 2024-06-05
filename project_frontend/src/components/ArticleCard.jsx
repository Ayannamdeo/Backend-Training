import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Mycontext } from "../store/CreateContext";

const ArticleCard = ({ post, showedit, handleLikeUnlike, userId }) => {
  // const {userName} = useContext(Mycontext);
  // console.log("//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////")
  const { title, createdAt, imageUrl, _id, userName } = post;
  const id = _id;

  const [isLiked, setIsLiked] = useState(post.likes.includes(userId));

  // Parse createdAt date to a human-readable format
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function handleClick() {
    console.log("button Clicked");
    handleLikeUnlike(userId, _id);
    setIsLiked(prevS => !prevS);
  }

  return (
    <div>
      <article className="relative overflow-hidden rounded-2xl bg-gray-900 dark:bg-gray-700 px-8 py-8 pb-8 pt-48 h-96 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] shadow-slate-600 transition-transform duration-300 transform hover:scale-105">
        <img
          src={
            imageUrl
              ? imageUrl
              : "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt="asdf"
          className="absolute inset-0 h-full w-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 z-0"></div>
        {/* <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 z-0"></div> */}
        <div className="flex items-center gap-x-4 absolute bottom-8 left-8 text-sm leading-6 text-gray-300">
          <time dateTime={formattedDate}>{formattedDate}</time>
          {/* <img src="https://images.pexels.com/photos/1262302/pexels-photo-1262302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="h-10 w-10 flex-none rounded-full bg-white/10" /> */}
          <p> {userName} </p>
          <button className="bg-red-500" onClick={handleClick}>{isLiked ? "Unlike" : "Like"}</button>
          <span> {post.likes.length}</span>

        </div>
        <h3 className="absolute bottom-20 left-8 right-8 text-lg font-semibold leading-6 text-white">
          <Link to={`/blogs/${id}`} className="relative z-10">
            {title}
          </Link>
        </h3>
        {showedit ? <div className="absolute top-4 right-4">
          <Link to={`/edit/${id}`} className="text-indigo-400 underline">
            Edit
          </Link>
        </div> : <></>}

      </article>
    </div>
  );
}

const MemoizedArticleCard = React.memo(ArticleCard);
console.log("MemoizedArticleCard is invoked //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////");

export { MemoizedArticleCard as ArticleCard };

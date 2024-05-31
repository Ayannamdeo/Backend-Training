import { Link } from "react-router-dom";

export function ArticleCard({ post }) {
  const { title, createdAt, photo, _id } = post;
  const id = _id;

  // Parse createdAt date to a human-readable format
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div>
      <article className="relative overflow-hidden rounded-2xl bg-gray-900 dark:bg-gray-700 px-8 py-8 pb-8 pt-48 h-96 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] shadow-slate-600 transition-transform duration-300 transform hover:scale-105">
        <img
          src={ photo ? photo : "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
          alt="asdf"
          className="absolute inset-0 h-full w-full object-cover z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 z-0"></div>
        {/* <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 z-0"></div> */}
        <div className="flex items-center gap-x-4 absolute bottom-8 left-8 text-sm leading-6 text-gray-300">
          <time dateTime={formattedDate}>{formattedDate}</time>
          {/* <img src="https://images.pexels.com/photos/1262302/pexels-photo-1262302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="h-10 w-10 flex-none rounded-full bg-white/10" /> */}
          <p> John </p>
        </div>
        <h3 className="absolute bottom-20 left-8 right-8 text-lg font-semibold leading-6 text-white">
          <Link to={ `/blogs/${id}` } className="relative z-10">
            {title}
          </Link>
        </h3>
      </article>
    </div>
  );
}

// const post = {
//     id: 1,
//     title: 'Boost your conversion rate',
//     href: '#',
//     description:
//       'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//     date: 'Mar 16, 2020',
//     datetime: '2020-03-16',
//     category: { title: 'Marketing', href: '#' },
//     author: {
//       name: 'Michael Foster',
//       role: 'Co-Founder / CTO',
//       href: '#',
//       imageUrl:
//         'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//   }

// export function ArticleCard(){
//     return (
//         <div>
//             <img src={postImage} alt="postImage1" />
// <article key={post.id || "1"} classNameName="flex max-w-xl flex-col items-start justify-between">
//               <div classNameName="flex items-center gap-x-4 text-xs">
//                 <time dateTime={post.datetime ||"3"} classNameName="text-gray-500">
//                   {post.date || "3"}
//                 </time>
//                 <a
//                   href={post.category.href || "sos"}
//                   classNameName="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
//                 >
//                   {post.category.title}
//                 </a>
//               </div>
//               <div classNameName="group relative">
//                 <h3 classNameName="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
//                   <a href={post.href || "ssos"}>
//                     <span classNameName="absolute inset-0" />
//                     {post.title || "adsf"}
//                   </a>
//                 </h3>
//                 <p classNameName="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description || "asdf"}</p>
//               </div>
//               <div classNameName="relative mt-8 flex items-center gap-x-4">
//                 <img src={post.author.imageUrl ||"asdf"} alt="" classNameName="h-10 w-10 rounded-full bg-gray-50" />
//                 <div classNameName="text-sm leading-6">
//                   <p classNameName="font-semibold text-gray-900">
//                     <a href={post.author.href || "asdf"}>
//                       <span classNameName="absolute inset-0" />
//                       {post.author.name || "asdf"}
//                     </a>
//                   </p>
//                   <p classNameName="text-gray-600">{post.author.role || "adf"}</p>
//                 </div>
//               </div>
//             </article>
//         </div>
//     );
// }

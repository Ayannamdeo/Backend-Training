import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { ArticleCard } from "../../../components/ArticleCard";
import { getAllBlogPosts } from "../../../services/blog";
import { SkeletonArticleCard } from "../../../components/SkeletonArticleCard";
import { ErrorMessage } from "../../../components/ErrorMessage";

export function Articles(){

    const {data, isLoading, isError} = useQuery({
        queryFn: () => getAllBlogPosts(),
        queryKey: ["posts"],
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        }
    });
    console.log("data from useQuery inside articles", data);
    
    if(isError){
        return (<ErrorMessage message="Couldn't fetch the Blog Data" />)
    }

    return (
        <section className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-28 py-10">
            {isLoading ? 
            ([1,2,3].map((item, idx) => ( 
                <SkeletonArticleCard key={idx}/>
             )))
            : data.map(post => (
                <ArticleCard key={post._id} post={post} />
            ))}
            {/* {!isLoading && !isError && data.map(post => (
                <ArticleCard key={post._id} post={post} />
            ))} */}
        </section>
    );
}
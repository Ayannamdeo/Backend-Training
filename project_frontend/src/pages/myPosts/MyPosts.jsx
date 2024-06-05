import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getMyBlogPosts } from "../../services/blog";
import { MainLayout } from "../../components/MainLayout";
import { SkeletonArticleCard } from "../../components/SkeletonArticleCard";
import { ArticleCard } from "../../components/ArticleCard";
import { useContext } from "react";
import { Mycontext } from "../../store/CreateContext";

export function MyPosts() {
  const { userId } = useContext(Mycontext);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getMyBlogPosts({ userId }),
    queryKey: ["myPosts"],
    retry: false,
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <MainLayout>
      <div className="bg-gradient-to-tr from-cyan-100 to-indigo-200 h-screen relative overflow-hidden">
        <section className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-28 py-10">
          {isLoading
            ? [1, 2, 3].map((item, idx) => <SkeletonArticleCard key={idx} />)
            : data.map((post) => <ArticleCard key={post._id} post={post} showedit={true} />)}
        </section>
      </div>
    </MainLayout>
  );
}

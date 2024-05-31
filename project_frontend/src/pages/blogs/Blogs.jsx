import { MainLayout } from "../../components/MainLayout";
import { Articles } from "./container/Articles";

export const Blogs = () => {
  return (
    <MainLayout>
      <div className="bg-gradient-to-tr from-cyan-100 to-indigo-200 h-screen relative overflow-hidden">
        <Articles />
      </div>
    </MainLayout>
  );
};

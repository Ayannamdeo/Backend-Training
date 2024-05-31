import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createBlogPost } from "../../services/blog";
import { MainLayout } from "../../components/MainLayout";
import { useContext } from "react";
import { Mycontext } from "../../store/CreateContext";

export const CreateBlog = () => {
  const{isAuth} = useContext(Mycontext);

  console.log("inside CreateBlog");
  console.log("isAuth",isAuth);
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ title, body }) => {
      // return createBlogPost({ title, body });
    },
    onSuccess: () => {
      toast.success("Blog post created successfully!");
      navigate("/blogs");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const submitHandler = (data) => {
    const { title, body } = data;
    mutate({ title, body });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
    mode: "onChange",
  });

  return (
    <MainLayout>
      <div className="container mx-auto max-w-3xl p-5 mt-10 mb-10">
        <h1 className="text-2xl font-medium mb-4">Create a New Blog Post</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
            <label className="block text-slate-800 mb-2">Title</label>
            <input
              type="text"
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is required",
                },
                minLength: {
                  value: 5,
                  message: "Title length must be at least 5 characters",
                },
              })}
              placeholder="Enter Title"
              className={`w-full p-2 border rounded ${
                errors.title ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.title?.message && (
              <p className="text-red-500 text-xs mt-1 ">
                {errors.title?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-slate-800 mb-2">Body</label>
            <textarea
              {...register("body", {
                required: {
                  value: true,
                  message: "Body is required",
                },
                minLength: {
                  value: 20,
                  message: "Body length must be at least 20 characters",
                },
              })}
              placeholder="Enter Body"
              className={`w-full p-2 border rounded ${
                errors.body ? "border-red-500" : "border-[#c3cad9]"
              }`}
            ></textarea>
            {errors.body?.message && (
              <p className="text-red-500 text-xs mt-1 ">
                {errors.body?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="disabled:opacity-70 disabled:cursor-not-allowed bg-indigo-500 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </form>
      </div>
    </MainLayout>
  );
};




import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getSingleBlogPost, updateBlogPost } from "../../services/blog";
import { MainLayout } from "../../components/MainLayout";

export const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery(["posts", id], () =>
    getSingleBlogPost({ id })
  );

  const { mutate } = useMutation({
    mutationFn: ({ title, body }) => {
      return updateBlogPost({ id, title, body });
    },
    onSuccess: () => {
      toast.success("Blog post updated successfully!");
      navigate("/blogs");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("body", data.body);
    }
  }, [data, setValue]);

  const submitHandler = (data) => {
    const { title, body } = data;
    mutate({ title, body });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <MainLayout>
      <div className="container mx-auto max-w-3xl p-5 mt-10 mb-10">
        <h1 className="text-2xl font-medium mb-4">Edit Blog Post</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
            <label className="block text-slate-800 mb-2">Title</label>
            <input
              type="text"
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is required",
                },
                minLength: {
                  value: 5,
                  message: "Title length must be at least 5 characters",
                },
              })}
              placeholder="Enter Title"
              className={`w-full p-2 border rounded ${
                errors.title ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.title?.message && (
              <p className="text-red-500 text-xs mt-1 ">
                {errors.title?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-slate-800 mb-2">Body</label>
            <textarea
              {...register("body", {
                required: {
                  value: true,
                  message: "Body is required",
                },
                minLength: {
                  value: 20,
                  message: "Body length must be at least 20 characters",
                },
              })}
              placeholder="Enter Body"
              className={`w-full p-2 border rounded ${
                errors.body ? "border-red-500" : "border-[#c3cad9]"
              }`}
            ></textarea>
            {errors.body?.message && (
              <p className="text-red-500 text-xs mt-1 ">
                {errors.body?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className="disabled:opacity-70 disabled:cursor-not-allowed bg-indigo-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

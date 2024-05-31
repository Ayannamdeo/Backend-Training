import axios from "axios";

const getToken = () => {
  return sessionStorage.getItem('JWT');
};

export const getAllBlogPosts = async () => {
  try {
    console.log("inside getAllBlogPosts");
    const token = getToken();

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("http://localhost:3000/api/blogs/", config);
    console.log("data from getAllBlogPosts", data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const getSingleBlogPost = async ({id}) => {
  try {
    console.log("inside getSingleBlogPost");
    const token = getToken();

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`http://localhost:3000/api/blogs/${id}`, config);
    console.log("data from getAllBlogPosts", data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    console.error(error.message);
    throw new Error(error.message);
  }
};
import PostList from "../components/PostList/PostList";
import CreatePostForm from "../components/CreatePostForm/CreatePostForm";
import Posts from "../components/Posts/Posts.jsx";

export const HomePage = () => {

    return (
        <>
            <CreatePostForm/>
            <Posts mode="AllPosts"/>
        </>
    )
}
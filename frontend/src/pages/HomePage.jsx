import PostList from "../components/PostList/PostList";
import CreatePostForm from "../components/CreatePostForm/CreatePostForm";

export const HomePage = () => {

    return (
        <>
            <CreatePostForm/>
            <PostList/>
        </>
    )
}
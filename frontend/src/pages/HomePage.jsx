import PostList from "../components/PostList/PostList";
import CreatePostForm from "../components/CreatePostForm/CreatePostForm";
import Banner from "../components/Banner/Banner";

export const HomePage = () => {

    return (
        <>
            <Banner/>
            <CreatePostForm/>
            <PostList mode="AllPosts"/>
        </>
    )
}

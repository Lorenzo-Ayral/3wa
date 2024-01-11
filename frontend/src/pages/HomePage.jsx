import PostList from "../components/PostList/PostList";
import CreatePostForm from "../components/CreatePostForm/CreatePostForm";
import Banner from "../components/Banner/Banner";
import { Helmet } from 'react-helmet';


export const HomePage = () => {

    return (
        <>
            <Helmet>
                <meta name="description" content="Page d'accueil" />
            </Helmet>
            <Banner/>
            <CreatePostForm/>
            <PostList mode="AllPosts" postTitle="Les dernières réflexions de ceux qui sont sortis de la caverne"/>
        </>
    )
}

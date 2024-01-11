import UserProfil from "../components/UserProfil/UserProfil.jsx";
import PostList from "../components/PostList/PostList.jsx";

const ProfilePage = () => {


    return (
        <div style={{minHeight: "85%"}}>
            <UserProfil/>
            <PostList mode="UserPosts" postTitle="Vos brillantes réflexions"/>
        </div>
    );
};

export default ProfilePage;

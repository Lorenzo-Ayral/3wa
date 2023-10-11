import Logout from "../components/Logout/Logout.jsx";
import UserProfil from "../components/UserProfil/UserProfil.jsx";
import PostList from "../components/PostList/PostList.jsx";

const ProfilePage = () => {


    return (
        <div style={{height: "82vh"}}>
            <UserProfil/>
            <PostList mode="UserPosts" postTitle="Vos brillantes réflexions"/>
            <Logout/>
        </div>
    );
};

export default ProfilePage;

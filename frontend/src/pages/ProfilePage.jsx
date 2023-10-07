import Logout from "../components/Logout/Logout.jsx";
import UserProfil from "../components/UserProfil/UserProfil.jsx";
import PostList from "../components/PostList/PostList.jsx";

const ProfilePage = () => {


    return (
        <>
            <UserProfil/>
            <PostList mode="UserPosts"/>
            <Logout/>
        </>
    );
};

export default ProfilePage;

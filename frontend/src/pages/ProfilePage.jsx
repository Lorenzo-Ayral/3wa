import UserPosts from "../components/UserPosts/UserPosts.jsx";
import Logout from "../components/Logout/Logout.jsx";
import UserProfil from "../components/UserProfil/UserProfil.jsx";

const ProfilePage = () => {


    return (
        <>
            <UserProfil/>
            <UserPosts mode="UserPosts"/>
            <Logout/>
        </>
    );
};

export default ProfilePage;

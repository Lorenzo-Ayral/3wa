import {useState} from "react";
import {createPost} from "../../api/api.js";
import styles from "../../css/components/CreatePostForm/CreatePostForm.module.css";
import {FaFeatherAlt} from "react-icons/fa";
const CreatePostForm = () => {
    const [content, setContent] = useState("");
    const [picture, setPicture] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPost(content, picture);
            setPicture(null);
            setContent("");
        } catch (error) {
            console.error("Erreur:", error);
            return alert("Erreur lors de la création du post:");
        }
    };

    // const handleImageChange = (e) => {
    //     const selectedImage = e.target.files[0];
    //     setPicture(selectedImage);
    // };

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.createPostForm}>
                <h2>Liberate cogitationes vestras !</h2>
                <div>
          <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className={styles.content}
          ></textarea>
                </div>
                {/*<div>*/}
                {/*    <label htmlFor="picture">Image :</label>*/}
                {/*    <input*/}
                {/*        type="file"*/}
                {/*        accept="image/*"*/}
                {/*        onChange={handleImageChange}*/}
                {/*        id="picture"*/}
                {/*    />*/}
                {/*</div>*/}
                <div>
                    <button type="submit" className={styles["submit-button"]}>
                        Déclamer ma prose <FaFeatherAlt/>
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreatePostForm;
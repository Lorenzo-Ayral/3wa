import {useState} from "react";
import {createPost} from "../../api/api.js";
import styles from "../../css/components/CreatePostForm/CreatePostForm.module.css";
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
            <h2>Quoi de neuf ?</h2>
            <form onSubmit={handleSubmit} className={styles.createPostForm}>
                <div>
          <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className={styles.content}
          />
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
                        Créer le post
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreatePostForm;
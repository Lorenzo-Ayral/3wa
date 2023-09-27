import { useState } from 'react';
import {createPost} from "../../api/api.js";

const PostForm = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('content', content);
            if (image) {
                formData.append('picture', image);
            }
            const response = await createPost(image, content);
            console.log('Post créé avec succès:', response);
            setImage(null);
            setContent('');
            setError(null);
        } catch (err) {
            setError('Erreur lors de la création du post.');
            console.error('Erreur:', err);
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    return (
        <div>
            <h2>Créer un post</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Image :</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div>
                    <label>Contenu du post :</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Créer le post</button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;

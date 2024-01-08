import {Post as InterfacePost} from "./main"
import {collection, getDocs, addDoc, query, where, deleteDoc, doc} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";

interface Props
 {
    post: InterfacePost;
};

interface Like {
    userId: string;
    likeId: string;
};

export const Post = (props: Props) => {
    const {post} = props;
    const [user] = useAuthState(auth);

    const [likes, setLikes] = useState<Like[] | null>(null);

    //adding the likes to our "likes" collection
    const likesRef = collection(db, "likes")

    //handles the query to our collection in order fr us to be able to dispaly the nubmer of lieks a post has
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    //modifying our state depending on the data we recieve from our db
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id })));
        
    };

    //specifying the data we want to add to our selected collection
    //by using the useAuthState hook we can get the user id, and bu using our above props we can get the post id
    //this function also handles automatically chaning the button depending on if you have liked the post
    const addLike = async () => {
        try{
            const newDoc = await addDoc(likesRef, {userId: user?.uid, postId: post.id});
            if (user) {
                setLikes((prev) => 
                  prev ? [...prev, {userId: user.uid, likeId: newDoc.id}]
                   : [{userId: user.uid, likeId: newDoc.id}]
                     );
                };
        } catch (err) {
            console.log(err);
        };
    };

    //similar to the addLike function, however we first need to query our collection to see if the current user id has already liked
    const removeLike = async () => {
        try{
            const likeToDeleteQuery = query(likesRef, 
             where("postId", "==", post.id),
             where("userId", "==", user?.uid)
             );

            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id
            const likeToDelete = doc(db, "likes", likeId )

            await deleteDoc(likeToDelete);
            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
                };
        } catch (err) {
            console.log(err);
        };
    };


       const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

       useEffect (() => {
        getLikes();
       }, []);

       return (
        <div className="postContainer">
            <div className="title">
                <h2>{post.title}</h2>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
    
            <div className="userInfo">
                <p className="username">@{post.username}</p>
                <button className="likeButton" onClick={hasUserLiked ? removeLike : addLike}>
                    {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                </button>
                {likes && <p className="likeCount">Likes: {likes?.length}</p>}
            </div>
        </div>
    );    
};
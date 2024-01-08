import {getDocs, collection} from "firebase/firestore";
import {auth, db} from "../../config/firebase";
import {useState, useEffect} from "react";
import {Post} from "./post";
import { useAuthState } from "react-firebase-hooks/auth";

export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}

export const Main = () => {
    const [user] = useAuthState(auth);


    //We have defined that our useState can either be of type Post or null
    const [postsList, setPostsList] = useState<Post[] | null>(null);

    //Getting the info from our firebase db
    const postsRef = collection (db, "posts");

    //Creating an async function that will wait until we request the post data from our db
    //.map is used to sort each of our posts by their id and then display each post via an array
    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]);
    };

    //Used for mounting
    useEffect (() => {
        getPosts();
    }, []);


    return (
        // Loop through our posts and returning an element for each
        <div>
            {postsList?.map((post) => (
            <Post post={post} />
            ))}
        </div>
    );
};
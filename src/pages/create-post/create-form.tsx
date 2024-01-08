import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {addDoc, collection} from "firebase/firestore";
import {db, auth} from"../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";

//createing our interface to declare our types for typescript
interface CreateFormData {
    title: string;
    description: string;
};

export const CreateForm = () => {
    const navigate =useNavigate();

    //getting our user info from our Google log in
    const [user] = useAuthState(auth);

    
    //by using yup we create a schema to define the inputs on our below form
    const schema = yup.object().shape({
        title: yup.string().required("You must provide a title."),
        description: yup.string().required("You must provide a desciption."),

    });

    //using a resolver to define our data requirements from our schema
    const {register, handleSubmit, formState: {errors},} = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    //declaring which db on firebase we will passs our inputted data to
    const postsRef = collection(db, "posts")

    //stating what data will be passed to our firebase db
    const onCreatePost = async (data: CreateFormData) => {
       await addDoc(postsRef, {
        title: data.title,
        description: data.description,
        username: user?.displayName,
        userId: user?.uid,
       });

       navigate("/");
    };

    return (
        <div className="createForm">
            <form onSubmit={handleSubmit(onCreatePost)}>
                <label>Title</label>
                <input placeholder="Title..." {...register("title")} />
                <p className="errorMessage">{errors.title?.message}</p>
    
                <label>Description</label>
                <textarea  placeholder="Description..." {...register("description")} />
                <p className="errorMessage">{errors.description?.message}</p>
    
                <input type="submit" className="submitFormButton" value="Submit" />
            </form>
        </div>
    );
    
};
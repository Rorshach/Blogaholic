import { useParams } from "react-router";
import {collection, doc, getDocs } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from "./fb";
import { useHistory } from "react-router-dom";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const docRef = collection(db, 'blogs');
        getDocs(docRef)
            .then((snapshot) => {
                let blogs = []
                snapshot.docs.forEach((doc) => {
                    if(doc.id == id) {
                        setBlog({...doc.data()});
                        setIsPending(false);
                        setError(null);
                    }
                })
        });
    });

    // const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();

    // const handleClick = () => {
    //     fetch('http://localhost:8000/blogs/' + blog.id, {
    //         method: 'DELETE'
    //     }).then(() => {
    //         history.push('/');
    //     });
    // }

    return ( 
        <div className="blog-details">
            { error && <div> Error: {error} </div> }
            { isPending && <div>Loading...</div> }
            {blog && (
                <article>
                    <h2>{ blog.title }</h2>    
                    <p>Written by: { blog.author }</p>
                    <div>{ blog.body }</div>
                    {/* <button onClick={handleClick}>Delete</button> */}
                </article>)}
        </div>
     );
}
 
export default BlogDetails;
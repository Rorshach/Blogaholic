import BlogList from './BlogList';
import useFetch from './useFetch';
import { onSnapshot, collection } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from "./fb";

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        onSnapshot(collection(db, "blogs"), 
        (snapshot) => {
            setBlogs(snapshot.docs.map((doc) => doc.data()));
            console.log(blogs);

            setIsPending(false);
            setError(null);
        },
        (error) => {
            setIsPending(false);
            setError(true);
            console.log(error);
        });
    });

    return ( 
        <div className="home">
            { error && <div> Error: {error} </div> }
            { isPending && <div>Loading...</div> }
            { blogs && <BlogList blogs={blogs} title="List of Blogs" />}
        </div>
     );
}
 
export default Home;
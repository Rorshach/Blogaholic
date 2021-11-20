import BlogList from './BlogList';
import useFetch from './useFetch';
import { onSnapshot, collection } from '@firebase/firestore';
import { useEffect } from 'react';
import db from "./fb";

const Home = () => {
    const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs');

    useEffect(() => {
        onSnapshot(collection(db, "blogs"), (snapshot) => {
            console.log(snapshot.docs.map((doc) => doc.data()));
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
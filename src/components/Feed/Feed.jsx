import Post from "../Post/Post";
import { useEffect, useState } from "react";
import { query } from "firebase/firestore";
import { db, storage } from "../../config/firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import { collection, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import loadingGif from "../../assets/loading-gif.gif";
import uniqid from "uniqid";


const retrievePostInformation = async (query, setPostState, previousState) => {
  const snap = await getDocs(query);

  const infoReadyPosts = snap.docs.map(async post => {
    const fileLocation = post._document.data.value.mapValue.fields.image.stringValue;

    const postPicsRef = ref(storage, fileLocation);
    const downloadedPicture = await getDownloadURL(postPicsRef);

    return {documentId: post.id, ...post.data(), image: downloadedPicture};
  });

  Promise.all([...infoReadyPosts]).then((values) => {
    setPostState({
      posts: [...previousState.posts, ...values], 
      lastPost: snap.docs[snap.docs.length - 1]
    });
  });
}

function Feed () {
  const [fetchedPosts, setFetchedPosts] = useState({posts: [], lastPost: {}});

  useEffect(() => {
    const first = query(collection(db, "posts"), orderBy("date"), limit(2));

    retrievePostInformation(first, setFetchedPosts, fetchedPosts);
  }, []);

  useEffect(() => {
    const checkForPagination = () => {
      const totalPageHeight = document.body.scrollHeight; 
      const scrollPoint = window.scrollY + window.innerHeight + 1;

      if (scrollPoint >= totalPageHeight) {
        const next = query(collection(db, "posts"), orderBy("date"), startAfter(fetchedPosts.lastPost), limit(2));
  
        retrievePostInformation(next, setFetchedPosts, fetchedPosts);
      }
    }

    window.addEventListener("scroll", checkForPagination);

    return () => {
      window.removeEventListener("scroll", checkForPagination);
    }
  }, [fetchedPosts]);

  return (
    <div className="feed-container">
      {fetchedPosts.posts?.map(post => (
        <Post 
          key={uniqid()}
          postInformation={post}
        />
      ))}
      {/* <img className="loading-gif" src={loadingGif} alt="loading gif" /> */}
    </div>
  )
}

export default Feed;
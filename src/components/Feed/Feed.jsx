import Post from "../Post/Post";
import { useEffect, useState, useContext } from "react";
import { query } from "firebase/firestore";
import { db, storage } from "../../config/firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import { collection, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";
import UserDataContext from "../../contexts/UserDataContext";
import loadingGif from "../../assets/loading-gif.gif";
import uniqid from "uniqid";


const retrievePostInformation = async (query, setPostState, previousState) => {
  const snap = await getDocs(query);

  const infoReadyPosts = snap.docs.map(async post => {
    const fileLocation = post._document.data.value.mapValue.fields.image.stringValue;
    const ppLocation = post._document.data.value.mapValue.fields.profilePicture.stringValue;

    const postPicsRef = ref(storage, fileLocation);
    const downloadedPicture = await getDownloadURL(postPicsRef);

    const ppRef = ref(storage, ppLocation);
    const downloadedPp = await getDownloadURL(ppRef);

    return {
      ...post.data(),
      documentId: post.id,
      image: downloadedPicture,
      profilePicture: downloadedPp
    };
  });

  Promise.all([...infoReadyPosts]).then((values) => {
    setPostState({
      posts: [...previousState.posts, ...values], 
      lastPost: snap.docs[snap.docs.length - 1]
    });
  });
}


function Feed () {
  const [userData, setUserData] = useContext(UserDataContext);
  const [followedAccounts, setFollowedAccounts] = useState([]);
  const [fetchedPosts, setFetchedPosts] = useState({posts: [], lastPost: {}});

  useEffect(() => {
    if (userData?.uid) {
      (async () => {
        const q = await getDocs(collection(db, "users", userData?.uid, "following"));

        const followerIds = q.docs.map(post => post.data().uid);

        const first = query(collection(db, "posts"), where('uid', 'in', followerIds), orderBy("date", "desc"), limit(2));

        retrievePostInformation(first, setFetchedPosts, fetchedPosts);
        setFollowedAccounts([...followerIds]);
      })()
    }
  }, [userData]);

  useEffect(() => {
    const checkForPagination = () => {
      const totalPageHeight = document.body.scrollHeight; 
      const scrollPoint = window.scrollY + window.innerHeight + 1;

      if (scrollPoint >= totalPageHeight) {
        const next = query(collection(db, "posts"), where('uid', 'in', followedAccounts), orderBy("date", "desc"), startAfter(fetchedPosts.lastPost), limit(2));
  
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
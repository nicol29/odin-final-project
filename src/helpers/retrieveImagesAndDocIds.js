import { getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../config/firebase-config";

const retrieveImagesAndDocIds = async (query, setState, option) => {
  const snap = await getDocs(query);
  const posts = snap.docs.map(post => {
    return {documentId: post.id, ...post.data()};
  });
  
  const pictures = posts.map(async (post) => {
    if(option === "profile") {
      const postPicsRef = ref(storage, post.profilePicture);
      const downloadedPicture = await getDownloadURL(postPicsRef);
      
      return { ...post, profilePicture: downloadedPicture}
    } else if (option === "post") {
      const postPicsRef = ref(storage, post.image);
      const downloadedPicture = await getDownloadURL(postPicsRef);

      return { ...post, image: downloadedPicture}
    }
  });

  Promise.all([...pictures]).then((values) => {
    setState([...values]);
  });
}

export default retrieveImagesAndDocIds;
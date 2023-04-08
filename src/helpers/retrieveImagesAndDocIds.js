import { getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../config/firebase-config";

const retrieveImagesAndDocIds = async (query, setState, option) => {
  const snap = await getDocs(query);
  const posts = snap.docs.map(post => {
    return {documentId: post.id, ...post.data()};
  });
  
  const pictures = posts.map(async (post) => {
    if (option === "profile") {
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
    if (option === "post") {
      console.log(values);
      let sorted = quickSort(values);
      console.log(sorted)
      setState([...quickSort(values)]);
    } else {
      setState([...values]);
    }
  });
}

export default retrieveImagesAndDocIds;


function quickSort (array, left = 0, right = array.length - 1) {
  if(left < right ) {
    let pivotIndex = pivot(array, left, right);

    quickSort(array, left, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, right)
  }
  return array;
}

function pivot (array, pivotIndex = 0, endIndex = array.length - 1) {
  let swapIndex = pivotIndex;

  for (let i = pivotIndex + 1; i <= endIndex; i++) {
    if (array[i].date > array[pivotIndex].date) {
      swapIndex ++;

      swap(array, swapIndex, i);
    }
  }
  swap(array, pivotIndex, swapIndex);

  return swapIndex;
}

function swap (array, indexOne, indexTwo) {
  let temp = array[indexOne];

  array[indexOne] = array[indexTwo];
  array[indexTwo] = temp;
}
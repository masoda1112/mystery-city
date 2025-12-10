import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  orderBy,
  limit,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { Firestore, FirebaseStorage } from "../firebaseConfig";


// ドキュメントの中で一致するものを検索する関数
export async function getDocumentsByCondition(collectionName, field, operator, value) {
  try {
    console.log(`Fetching from collection: ${collectionName}, field: ${field}, value: ${value}`)
    console.log('Firestore instance:', Firestore)
    console.log('User Agent:', navigator.userAgent)
    console.log('Is Mobile:', /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    
    const q = query(collection(Firestore, collectionName), where(field, operator, value))
    console.log('Query created, executing...')
    const querySnapshot = await getDocs(q);
    console.log('Query executed successfully')
    const results = [];
    querySnapshot.forEach((docSnap) => {
      results.push({ id: docSnap.id, ...docSnap.data() });
    });
    console.log(`Found ${results.length} documents in ${collectionName}`)
    return results;
  } catch (error) {
    console.error(`Error in getDocumentsByCondition (${collectionName}):`, error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack,
      name: error.name,
      userAgent: navigator.userAgent,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    });
    throw error;
  }
}

// getDocumentByIdのサポート関数
const getDocSupport = async(docRef)=>{
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.error("No such document!");
    return null;
  }
}

// ドキュメントIDから検索して取得
export const getDocumentById = async (collectionName, docId) => {
  try {
    const docRef = doc(Firestore, collectionName, docId);
    const data = await getDocSupport(docRef)
    return data
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};

// 全ドキュメントを取得する関数
export async function getCollectionDocuments(collectionName) {
  const collectionRef = collection(Firestore, collectionName);
  try {
    const querySnapshot = await getDocs(collectionRef); 
    const documents = querySnapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    return documents;
  } catch (error) {
    console.error("データの取得に失敗しました:", error);
    return [];
  }
}

// 全ドキュメントをソートして取得する関数（ランキング用）
export const getCollectionDocumentsWithSort = async(collectionName, field) =>{
  const rankingsRef = collection(Firestore, collectionName);
  const q = query(rankingsRef, orderBy(field, 'desc'), limit(1000));
  const querySnapshot = await getDocs(q);
  const rankings = [];
  querySnapshot.forEach((docSnap) => {
    rankings.push(docSnap.data());
  });
  return rankings;
}

// フィールドの一部を更新する関数（該当するドキュメントは1つだけ）
export async function updateDocumentField(collectionName, field, operator, value, updateData) {
  try {
    const documents = await getDocumentsByCondition(collectionName, field, operator, value);
    if (documents.length === 1) {
      const docData = documents[0];
      const docRef = doc(Firestore, collectionName, docData.id);
      await updateDoc(docRef, updateData);
      console.log(`Document with id ${docData.id} updated successfully`);
    } else {
      if (documents.length === 0) {
        const errorMsg = "No documents found matching the criteria.";
        console.log(errorMsg);
        throw new Error(errorMsg);
      } else {
        const errorMsg = "Multiple documents found. Expected exactly one.";
        console.log(errorMsg);
        throw new Error(errorMsg);
      }
    }
  } catch (error) {
    console.error(`Error in updateDocumentField (${collectionName}):`, error);
    throw error;
  }
}

// rankingをアップデートする関数
const updateRanking = async(currentUser, updateUser) =>{
  const updateRanking = {
    userName: currentUser[0].userName,
    totalScore: currentUser[0].totalScore + 1
  };
  await updateDocumentField('ranking', 'userName', '==', updateUser.userName, updateRanking);
}

// userのtotalScoreをアップデートする関数
const updateTotalScore = async(currentUser) => {
  const updateUser = {
    ...currentUser[0],
    totalScore: currentUser[0].totalScore + 1
  };
  await updateDocumentField('users', 'userName', '==', updateUser.userName, updateUser);
  setLocalStorageItem('user', updateUser);
  return updateUser;
}

// userMysteryStatusをアップデートする
const updateUserMysteryStatus = async(statusArray, updateData, docRef) => {
  const updatedStatusArray = statusArray.map((item) => {
    if (item.mystery_id == updateData) {
      return { ...item, status: 1 };
    }
    return item;
  });
  await updateDoc(docRef, { mysteriesStatus: updatedStatusArray });
}

// mysteryStatusをチェック
const getMysteryStatus = async(userName) =>{
  const docRef = doc(Firestore, 'userMysteryStatus', userName);
  const data = await getDocSupport(docRef)
  return {data: data, docRef: docRef}
}

// クリア時のアップデートの処理
export const updateWhenClear = async(userName, updateData, answer)=>{
  try{
    const {data, docRef} = await getMysteryStatus(userName)
    const statusArray = data.mysteriesStatus
    if(statusArray[answer.mystery_id].status == 0){
      const currentUser = await getDocumentsByCondition('users', 'userName', '==', userName)
      const updateUser = await updateTotalScore(currentUser)
      updateRanking(currentUser, updateUser)
    }
    updateUserMysteryStatus(statusArray, updateData, docRef) 
  }catch (error) {
    console.error("更新時にエラーが発生しました:", error);
  }
}


// 新しいドキュメントを追加する関数
export const addNewDocument = async (collectionName,  data) => {
  try {
    const docRef = await addDoc(collection(Firestore, collectionName), data);
    console.log("新しいドキュメントが追加されました。ID:", docRef.id);
  } catch (e) {
    console.error("ドキュメントの追加に失敗しました:", e);
  }
};

export const addDocument = addNewDocument;


// 新しいドキュメントを追加する関数(ID付き)
export const addNewDocumentWithID = async (collectionName, documentID, data) => {
  try {
    const docRef = doc(Firestore, collectionName, documentID)
    await setDoc(docRef, data)
  } catch (error) {
    console.error("Error adding document: ", error)
  }
};

// ローカルストレージのアイテムを使用
export const setLocalStorageItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error("Error setting item in local storage:", error)
  }
}


// ランクの配列
export const addToRankArray = async(rank, name) => {
  const docRef = doc(Firestore, "ranking", rank.toString())
  const MAX_ARRAY_SIZE = 1000
  try {
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const rankData = docSnapshot.data().rank || {}
      const rank1 = rankData[1] || [];
      if (rank1.length < MAX_ARRAY_SIZE) {
        await updateDoc(docRef, {
          "1": arrayUnion(name),
        });
      } else {
        await updateDoc(docRef, {
          "2": arrayUnion(name),
        });
      }
    } else {
      console.error(`Document with rank ID ${rank} does not exist.`)
    }
  } catch (error) {
    console.error("Error setting item in local storage:", error)
  }
}


// ユーザーネームがユニークかどうか確認する関数
export const checkUserNameExists = async (userName) => {
  const resultByAPI = await getDocumentsByCondition("userNames", "userName", "==" , userName)
  return !(resultByAPI.length == 0);
}

// 登録のバリデーション
export const validateSignup = async(userName, mail, password) => {
  const newErrors = { userName: "", mail: "", password: "" };
  let isValid = true;

  if (!userName) {
    newErrors.userName = "ユーザーネームは必須です";
    isValid = false;
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!mail) {
    newErrors.mail = "メールアドレスは必須です";
    isValid = false;
  } else if (!emailRegex.test(mail)) {
    newErrors.mail = "メールアドレスの形式が無効です";
    isValid = false;
  }

  if (!password) {
    newErrors.password = "パスワードは必須です";
    isValid = false;
  } else if (password.length < 8) {
    newErrors.password = "パスワードは8文字以上である必要があります";
    isValid = false;
  }

  return isValid ? "" : newErrors
};

// ログインのバリデーション
export const validateLogin = async( mail, password) => {
  const newErrors = { userName: "", mail: "", password: "" };
  let isValid = true;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!mail) {
    newErrors.mail = "メールアドレスは必須です";
    isValid = false;
  } else if (!emailRegex.test(mail)) {
    newErrors.mail = "メールアドレスの形式が無効です";
    isValid = false;
  }

  if (!password) {
    newErrors.password = "パスワードは必須です";
    isValid = false;
  } else if (password.length < 8) {
    newErrors.password = "パスワードは8文字以上である必要があります";
    isValid = false;
  }

  return isValid ? "" : newErrors
};

// firebaseから画像取得
export const fetchImageURL = async (path) => {
  try {
    const imageRef = ref(FirebaseStorage, path);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return null;
  }
};

// mysteriesとcardsのリスト取得
export const getDataList = async (listName) => {
  const listDocs = await getCollectionDocuments(listName)
  const user = getLocalstorageUser()
  const userStatusDocs = await getDocumentById("userMysteryStatus", user.userName)

  const listWithDetails = await Promise.all(
    listDocs.map(async (data , index) => {
      const imgURL = await fetchImageURL(data.img);
      const userStatus = userStatusDocs.mysteriesStatus[index].status

      if(listName == 'mystery'){
        return {
          id: index,
          name: data.name,
          description: data.description,
          price: data.price,
          status: userStatus,
          description: data.description,
          img: imgURL,
        };
      }else if(listName == 'card'){
        return {
          id: index,
          name: data.name,
          status: userStatus,
          img: imgURL,
        };
      }
    })
  );
  return listWithDetails
};

// localStorageのuserデータ取得
export const getLocalstorageUser = () =>{
  const user = JSON.parse(localStorage.getItem('user'))
  return user
}

// ▼ 追加：answer の重複チェック
export const checkDuplicateAnswer = async (answer) => {
  const trimmed = (answer || '').trim();
  if (!trimmed) return false;
  const docs = await getDocumentsByCondition('question', 'answer', '==', trimmed);
  return docs.length > 0;
};

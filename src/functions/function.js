import { async } from "@firebase/util";
import { collection, query, where, getDocs, getDoc, setDoc, addDoc, doc, updateDoc, arrayUnion, orderBy, limit, } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { Firestore, FirebaseStorage } from "../firebaseConfig";


// ドキュメントの中で一致するものを検索する関数
export async function getDocumentsByCondition(collectionName, field, operator, value) {
  // クエリを作成
  const q = query(collection(Firestore, collectionName), where(field, operator, value))
  
  // クエリを実行
  const querySnapshot = await getDocs(q);
  
  // 結果を格納する配列
  const results = [];
  querySnapshot.forEach((doc) => {
    results.push({ id: doc.id, ...doc.data() });
  });
  return results; // 取得したドキュメントの配列を返す
}

const getDocSupport = async(docRef)=>{
      // ドキュメントを取得
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // データが存在する場合
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        // ドキュメントが見つからない場合
        console.error("No such document!");
        return null;
      }
}

// ドキュメントIDから検索して取得
export const getDocumentById = async (collectionName, docId) => {
  try {
    // 指定したコレクションとドキュメントIDで参照を作成
    const docRef = doc(Firestore, collectionName, docId);
    
    // ドキュメントを取得
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
        const querySnapshot = await getDocs(collectionRef); // 全ドキュメント取得
        const documents = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return documents;

    } catch (error) {
        console.error("データの取得に失敗しました:", error);
        return []; // エラー時は空配列を返す
    }
}

// 全ドキュメントをソートして取得する関数（ランキング用）
export const getCollectionDocumentsWithSort = async(collectionName, field) =>{
  // コレクション参照を作成
  const rankingsRef = collection(Firestore, collectionName);
  // クエリを作成（スコア順に並べ、上位10人を取得）
  const q = query(rankingsRef, orderBy(field, 'desc'), limit(1000));
  // クエリ実行
  const querySnapshot = await getDocs(q);
  const rankings = [];
  querySnapshot.forEach((doc) => {
    rankings.push(doc.data());
  });
  
  return rankings
}

// フィールドの一部を更新する関数（該当するドキュメントは1つだけ）
export async function updateDocumentField(collectionName, field, operator, value, updateData) {
  // 条件に一致するドキュメントを取得（必ず1つのドキュメントを返すと仮定）
  const documents = await getDocumentsByCondition(collectionName, field, operator, value);

  // ドキュメントが見つかれば、最初のドキュメントを更新
  if (documents.length === 1) {
    const docData = documents[0]; // 一致するドキュメント（1つ）
    
    // 更新したいドキュメントの参照を取得
    const docRef = doc(Firestore, collectionName, docData.id);
    
    // 更新処理
    try {
      await updateDoc(docRef, updateData);
      console.log(`Document with id ${docData.id} updated successfully`);
    } catch (error) {
      console.error(`Error updating document with id ${docData.id}:`, error);
    }
  } else {
    if (documents.length === 0) {
      console.log("No documents found matching the criteria.");
    } else {
      console.log("Multiple documents found. Expected exactly one.");
    }
  }
}


// userのtotalScoreをアップデートする関数
export const updateTotalScore = async(userName) => {
  // userNameに一致するdocumentを取得
  try{
    const currentUser = await getDocumentsByCondition('users', 'userName', '==', userName)
    console.log('currentUser', currentUser[0])
    const updateUser = {...currentUser[0], totalScore: currentUser[0].totalScore + 1}
    const updateRanking = {userName: currentUser[0].userName, totalScore: currentUser[0].totalScore + 1}
    console.log(updateUser)
    await updateDocumentField('users', 'userName', '==', updateUser.userName, updateUser)
    await updateDocumentField('ranking', 'userName', '==', updateUser.userName, updateRanking)
    setLocalStorageItem('user', updateUser)
  }catch (error) {
    console.error("更新時にエラーが発生しました:", error);
  }
  
}


// クリア時ランキング更新
// userNameで検索する
// スコアを1足す（update）

// export const updateRanking = async() =>{
//   const user = getLocalstorageUser()
//   const currentScore = user.totalScore
//   const updateData = {totalScore: currentScore + 1}
//   console.log(updateData)
//   await updateDocumentField('ranking', 'userName', '==', user.userName, updateData)
// }

// userMysteryStatusを検索し、アップデートする関数
export const updateUserMysteryStatus = async(userName, updateData, answer) => {
  // userNameに一致するdocumentを取得
  try{
    const docRef = doc(Firestore, 'userMysteryStatus', userName);
    const data = await getDocSupport(docRef)
    // mysteriesStatusの中で該当するstatusを更新
    const statusArray = data.mysteriesStatus
    if(statusArray[answer.mystery_id].status == 0){
      // updateRanking()
      updateTotalScore(userName)
    }
    const updatedStatusArray = statusArray.map((item) => {
      if(item.mystery_id == updateData) {
        return { ...item, status: 1 };
      }
      return item
    })
  
    await updateDoc(docRef, { mysteriesStatus: updatedStatusArray });

  }catch (error) {
    console.error("更新時にエラーが発生しました:", error);
  }
  
}

// 新しいドキュメントを追加する関数
export const addNewDocument = async (collectionName,  data) => {
  try {
    // コレクションに新しいドキュメントを追加
    const docRef = await addDoc(collection(Firestore, collectionName), data);
    console.log("新しいドキュメントが追加されました。ID:", docRef.id);
  } catch (e) {
    console.error("ドキュメントの追加に失敗しました:", e);
  }
};


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
    // オブジェクトや配列をJSON文字列に変換して保存
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error("Error setting item in local storage:", error)
  }
}


// ランクの配列
export const addToRankArray = async(rank, name) => {
  // rank（クリア数)を文字列に変換し、refを作成
  const docRef = doc(Firestore, "ranking", rank.toString())
  const MAX_ARRAY_SIZE = 1000
  try {
    // 同じrankの配列を取得
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      // ドキュメントが存在する場合、rank配列にデータを追加
      const rankData = docSnapshot.data().rank || {}
      const rank1 = rankData[1] || [];
      if (rank1.length < MAX_ARRAY_SIZE) {
        // rank.1 にデータを追加
        await updateDoc(docRef, {
          "1": arrayUnion(name),
        });
      } else {
        // rank.2 にデータを追加
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
};


// ユーザーネームがユニークかどうか確認する関数
export const checkUserNameExists = async (userName) => {
  const resultByAPI = await getDocumentsByCondition("userNames", "userName", "==" , userName)
  console.log(resultByAPI)
  console.log(resultByAPI.length)
  return !(resultByAPI.length == 0); // ユーザー名がすでに存在する場合はtrueを返す
};

// 登録のバリデーション
export const validateSignup = async(userName, mail, password) => {
    const newErrors = { userName: "", mail: "", password: "" };
    let isValid = true;

    // ユーザーネームのバリデーション
    if (!userName) {
        newErrors.userName = "ユーザーネームは必須です";
        isValid = false;
    }

    // 名前がユニークかどうか確認
    const unique = await checkUserNameExists(userName)
    if(unique){
        newErrors.userName = "このユーザーネームは既に使われています。"
        isValid = false;
    }

    // メールアドレスのバリデーション
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!mail) {
        newErrors.mail = "メールアドレスは必須です";
        isValid = false;
        } else if (!emailRegex.test(mail)) {
        newErrors.mail = "メールアドレスの形式が無効です";
        isValid = false;
    }

    // パスワードのバリデーション
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

  // メールアドレスのバリデーション
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!mail) {
      newErrors.mail = "メールアドレスは必須です";
      isValid = false;
      } else if (!emailRegex.test(mail)) {
      newErrors.mail = "メールアドレスの形式が無効です";
      isValid = false;
  }

  // パスワードのバリデーション
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
    const imageRef = ref(FirebaseStorage, path); // path は Firebase Storage 内のファイルパス
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
  // Step 2: FirestoreからuserMysteryStatusを取得
  const user = getLocalstorageUser()
  const userStatusDocs = await getDocumentById("userMysteryStatus", user.userName)

  // Step 3: 画像URLをFirebase Storageから取得
  const listWithDetails = await Promise.all(
    listDocs.map(async (data , index) => {
      const imgURL = await fetchImageURL(data.img); // 画像パスからURLを取得
      const userStatus = userStatusDocs.mysteriesStatus[index].status

      if(listName == 'mystery'){
        return {
          id: index,
          name: data.name,
          description: data.description,
          price: data.price,
          status: userStatus, // 進行状況がない場合はデフォルト値
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


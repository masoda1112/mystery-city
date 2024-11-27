import { async } from "@firebase/util";
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, arrayUnion} from "firebase/firestore";
import { Firestore } from "../firebaseConfig";


// ドキュメントの中で一致するものを検索する関数
export async function getDocumentsByCondition(collectionName, field, operator, value) {
  // クエリを作成
  const q = query(collection(Firestore, collectionName), where(field, operator, value));
  
  // クエリを実行
  const querySnapshot = await getDocs(q);
  
  // 結果を格納する配列
  const results = [];
  querySnapshot.forEach((doc) => {
    results.push({ id: doc.id, ...doc.data() });
  });
  return results; // 取得したドキュメントの配列を返す
}

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

// 新しいドキュメントを追加する関数
export const addNewDocumentWithID = async (collectionName, documentID, data) => {
  try {
    const docRef = doc(Firestore, collectionName, documentID)
    await setDoc(docRef, data)
  } catch (error) {
    console.error("Error adding document: ", error)
  }
};

export const setLocalStorageItem = (key, value) => {
  try {
    // オブジェクトや配列をJSON文字列に変換して保存
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error("Error setting item in local storage:", error)
  }
}

export const addToRankArray = async(rank, uid) => {
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
          [`${rank}.1`]: arrayUnion(uid),
        });
      } else {
        // rank.2 にデータを追加
        await updateDoc(docRef, {
          [`${rank}.2`]: arrayUnion(uid),
        });
      }
    } else {
      console.error(`Document with rank ID ${rank} does not exist.`)
    }
  } catch (error) {
    console.error("Error setting item in local storage:", error)
  }
};


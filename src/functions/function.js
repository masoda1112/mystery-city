import { collection, query, where, getDocs } from "firebase/firestore";
import { Firestore } from "../firebaseConfig";

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

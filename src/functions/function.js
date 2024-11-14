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

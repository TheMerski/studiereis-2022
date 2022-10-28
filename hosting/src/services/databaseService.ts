import { initializeApp } from 'firebase/app';
import * as firebaseConfig from '../../firebase-config.json';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  limit,
  orderBy,
  enableIndexedDbPersistence,
} from 'firebase/firestore';
import { Question, questionConvertor } from './question';
import { v4 as uuidv4 } from 'uuid';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

const latestQuestionVersion = 1;
const questionCollectionName = 'questions';

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    console.log('Multiple tabs open, not using offline mode');
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
    console.log('Browser does not support offline mode');
  }
});

export async function getQuestions(approved = true, amount = 1): Promise<Question[]> {
  try {
    const questions = collection(db, questionCollectionName);
    const q = query(
      questions,
      where('approved', '==', approved),
      orderBy('creation_time', 'desc'),
      limit(amount)
    );
    const questionsSnapshot = await getDocs(q);
    const questionList = questionsSnapshot.docs.map((doc) => doc.data() as Question);
    return questionList;
  } catch (e) {
    console.dir(e);
    return [];
  }
}

export async function createQuestion(
  question: string,
  correct = 'Correct',
  incorrect = 'Incorrect'
): Promise<void> {
  try {
    const newQuestion = new Question(
      uuidv4(),
      latestQuestionVersion,
      true,
      new Date(),
      question,
      correct,
      incorrect
    );
    const col = collection(db, questionCollectionName).withConverter(questionConvertor);
    await addDoc(col, newQuestion);
    console.log('Added doc');
  } catch (e) {
    console.error(e);
  }
}

import { initializeApp } from 'firebase/app';
import * as firebaseConfig from '../../firebase-config.json';
import { getFirestore, collection, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';
import { Question, questionConvertor } from './question';
import { v4 as uuidv4 } from 'uuid';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

const latestQuestionVersion = 1;
const questionCollectionName = 'questions';

export async function getQuestions(): Promise<Question[]> {
  try {
    const questions = collection(db, questionCollectionName);
    const questionsSnapshot = await getDocs(questions);
    const questionList = questionsSnapshot.docs.map((doc) => doc.data() as Question);
    return questionList;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function createQuestion(
  question: string,
  correct = 'True',
  incorrect = 'False'
): Promise<void> {
  try {
    const newQuestion = new Question(
      uuidv4(),
      latestQuestionVersion,
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

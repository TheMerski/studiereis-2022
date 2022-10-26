import type { DocumentSnapshot } from 'firebase/firestore/lite';

export class Question {
  public constructor(
    public id: string,
    public version: number,
    public creation_time: Date,
    public question_eng: string,
    public correct_eng: string,
    public incorrect_eng: string
  ) {
    this.id = id;
    this.version = version;
    this.creation_time = creation_time;
    this.question_eng = question_eng;
    this.correct_eng = correct_eng;
    this.incorrect_eng = incorrect_eng;
  }
}

export const questionConvertor = {
  toFirestore: (question: Question) => {
    return {
      id: question.id,
      version: question.version,
      creation_time: question.creation_time,
      question_eng: question.question_eng,
      correct_eng: question.correct_eng,
      incorrect_eng: question.incorrect_eng,
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot) => {
    const data = snapshot.data();
    return new Question(
      data?.id,
      data?.version,
      data?.creation_time,
      data?.question_eng,
      data?.correct_eng,
      data?.incorrect_eng
    );
  },
};

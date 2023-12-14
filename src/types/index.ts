export type StateType = {
  id: number;
  name: string;
};

export type CampusType = {
  id: string;
  name: string;
  state: StateType;
};

export type UserLoginType = {
  username: string;
  password: string;
};

export type UserRegisterType = {
  name: string;
  email: string;
  password: string;
  avatar: string;
  campus_id: number;
};

export type RatingType = {
  name: string;
  description: string;
};

export type UserType = {
  id?: string;
  name: string;
  avatar: string;
  campus?: CampusType;
  email?: string;
  rating?: RatingType;
  votes?: number;
  is_owner: boolean;
  count_questions?: number;
  count_answers?: number;
};

export type QuestionType = {
  id: string;
  user_id?: string;
  title: string;
  description: string;
  votes: number;
  my_vote: number;
  isOwnerOfQuestion: boolean;
  isShowingDetails: boolean;
  user: UserType;
  comments: CommentType[];
  answers: AnswerType[];
};

export interface NewQuestionTypes {
  title: string;
  question: string;
  category_id: number;
}

export interface NewAnswerTypes {
  answer: string;
}

export interface NewAnswerOnQuestionTypes extends NewAnswerTypes {
  question_id: number;
}

export interface NewCommentTypes {
  comment: string;
}

export interface NewCommentOnQuestionTypes extends NewCommentTypes {
  question_id: number;
}

export interface NewCommentOnAnswerTypes extends NewCommentTypes {
  answer_id: number;
}

export type AnswerType = {
  id: string;
  description: string;
  votes: number;
  my_vote: number;
  accepted: boolean;
  user: UserType;
  comments: CommentType[];
};

export type CommentType = {
  id: string;
  description: string;
  user: UserType;
  isOwnerOfComment: boolean;
};

export type CategoryType = {
  id: number;
  name: string;
};

export type RankingUserType = {
  id?: number;
  position?: number;
  name: string;
  avatar: string;
  votes: number;
  rating: {
    name: string;
    description: string;
  };
};

export type CardUserData = {
    question: string;
    answer: string;
    tag: string;
}

export type CardDTO = {
    id: string;
    category: string;
    question: string;
    answer: string;
    tag: string;
}

export type AnswerDTO = {
    isValid: boolean;
}
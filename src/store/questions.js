import Radio from "../components/types/Radio";
import Checkbox from "../components/types/Checkbox";

const questions = [
  {
    title: 'Тестовый вопрос',
    answers: [
      {
        value: 1,
        text: 'Ответ 1'
      },
      {
        value: 2,
        text: "Ответ 2"
      },
      {
        value: 3,
        text: "Ответ 3"
      }
    ],
    correctValue: "1",
    selected: '',
    type: Radio
  },
  {
    title: 'Тестовый вопрос',
    answers: [
      {
        value: 1,
        text: 'Ответ 4'
      },
      {
        value: 2,
        text: "Ответ 5"
      },
      {
        value: 3,
        text: "Ответ 6"
      }
    ],
    correctValue: "2",
    selected: '',
    type: Checkbox
  },
  {
    title: 'Тестовый вопрос',
    answers: [
      {
        value: 1,
        text: 'Ответ 7'
      },
      {
        value: 2,
        text: "Ответ 8"
      },
      {
        value: 3,
        text: "Ответ 9"
      },
      {
        value: 4,
        text: "Ответ 10"
      }
    ],
    correctValue: ["2", "3"],
    selected: [],
    maxCheckedValues: 3,
    type: Checkbox
  }
];

export default questions;
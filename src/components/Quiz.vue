<template>
  <div class="Quiz">
    <div v-if="lastPage">
      <h2>Результаты</h2>
      <div class="mt-3">
        <div v-for="(question, index) in questions" :key="'result'+index">
          <h3>{{ index + 1 }}. {{ question.title }}</h3>
          <component :is="question.type" :answers="question.answers" v-model="question.selected"
                     :show-result="lastPage" :correct-value="question.correctValue">
          </component>
        </div>
        <div class="my-3">
          <div>Правильных ответов: {{ results.correctCount }}</div>
          <div>Неправильных ответов: {{ results.wrongCount }}</div>
        </div>
        <div class="form-group">
          <button class="btn btn-success" @click="reset">Пройти заново</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="progress mb-3">
        <div class="progress-bar progress-bar-striped " role="progressbar"
             :style="progressbarWidth">{{ status }}
        </div>
      </div>
      <h3>{{ questionNum + 1 }}. {{ current.title }}</h3>
      <component :is="current.type" :answers="current.answers" v-model="current.selected"></component>
      <div class="form-group mt-2">
        <button class="btn btn-primary" :disabled="current.selected.length === 0"
                @click.prevent="questionNum++">Ответить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import questions from '../store/questions';

export default {
  name: 'Quiz',
  data() {
    return {
      questions,
      questionNum: 0,
    }
  },
  computed: {
    current() {
      return this.questions[this.questionNum];
    },
    lastPage() {
      return this.questionNum === this.questions.length;
    },
    progressbarWidth() {
      return {width: this.questionNum * 100 / this.questions.length + '%'};
    },
    status() {
      return this.questionNum > 0 ? `${this.questionNum} / ${this.questions.length}` : '';
    },
    results() {
      let correctCount = 0;
      let wrongCount = 0;
      this.questions.forEach(question => {
        if (question.selected instanceof Array) {
          question.selected.forEach(answer => {
            if (question.correctValue instanceof Array) {
              if (question.correctValue.includes(answer)) {
                correctCount++;
              } else {
                wrongCount++;
              }
            } else {
              if (question.correctValue === answer) {
                correctCount++;
              } else {
                wrongCount++;
              }
            }
          });
        } else {
          if (question.correctValue === question.selected) {
            correctCount++;
          } else {
            wrongCount++;
          }
        }
      });
      return {correctCount, wrongCount};
    },
  },
  methods: {
    reset() {
      this.questionNum = 0;
      this.questions.forEach(question => {
        question.selected = question.selected instanceof Array ? [] : '';
      });
    }
  }
}
</script>

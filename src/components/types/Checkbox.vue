<template>
  <div>
    <div class="form-check" v-for="answer in answers" :key="answer.value">
      <input type="checkbox" class="form-check-input" :id="'checkbox'+answer.value" :value="answer.value"
             :checked="value instanceof Array
                        ? value.includes(answer.value.toString())
                        : value === answer.value.toString()"
             @change="onChange" :disabled="showResult"/>
      <label class="form-check-label" :for="'checkbox'+answer.value"
             :style="labelColor(answer.value.toString())">{{ answer.text }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    answers: {
      type: Array,
      required: true
    },
    value: [String, Array],
    showResult: Boolean,
    correctValue: [String, Array]
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  methods: {
    onChange(e) {
      if (this.value instanceof Array) {
        // multiple values checkbox
        let index = this.value.indexOf(e.target.value);
        if (e.target.checked) {
          this.$emit('change', index === -1
              ? this.value.concat([e.target.value])
              : this.value
          );
        } else {
          if (index >= 0) {
            this.$emit('change', this.value.filter(value => value !== e.target.value));
          }
        }
      } else {
        // single value checkbox
        this.$emit('change', e.target.checked ? e.target.value : '');
      }
    },
    labelColor(value) {
      let color = '';
      const correctColor = 'lime';
      const wrongColor = 'red';
      if (this.showResult) {
        if (this.value instanceof Array && this.correctValue instanceof Array) {
          // mark correct answer
          if (this.correctValue.includes(value)) {
            color = correctColor;
          }
          // mark chosen answer
          if (this.value.includes(value)) {
            color = this.correctValue.includes(value) ? correctColor : wrongColor;
          }
        } else {
          // mark correct answer
          if (value === this.correctValue) {
            color = correctColor;
          }
          // mark chosen answer
          if (this.value === value) {
            color = value === this.correctValue ? correctColor : wrongColor;
          }
        }
      }
      return {color: color};
    }
  }
}
</script>
<template>
    <div>
        <div class="form-check" v-for="answer in answers" :key="answer.value">
            <input type="radio" class="form-check-input" :id="'radio'+answer.value" :value="answer.value"
                   :checked="value === answer.value.toString()" @change="onChange" :disabled="showResult"/>
            <label class="form-check-label" :for="'radio'+answer.value"
                   :style="labelColor(answer.value.toString())">{{ answer.text }}</label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Radio",
        props: {
            answers: {
                type: Array,
                required: true
            },
            value: String,
            showResult: Boolean,
            correctValue: String
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        methods: {
            onChange(e) {
                this.$emit('change', e.target.value);
            },
            labelColor(value) {
                let color = '';
                if (this.showResult) {
                    // mark correct answer
                    if (value === this.correctValue) {
                        color = 'lime';
                    }
                    // mark choosen answer
                    if (this.value === value) {
                        color = value === this.correctValue ? 'lime' : 'red';
                    }
                }
                return {color: color};
            }
        }
    }
</script>
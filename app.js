const app = Vue.createApp({
    data() {
        return {
            counter: 0,
            name: '',
            lastName: ''
        };
    },
    watch: {
        counter(value) {
            if (value > 50) {
                setTimeout(() => {
                    this.counter = 0;
                }, 2000)
            }
        }
    },
    methods: {
        add(num) {
            this.counter = this.counter + num;
        },
        reduce(num) {
            this.counter = this.counter - num;
            // this.counter--;
        },
        resetInput() {
            this.name = '';
            this.lastName = '';
        }
    },
    computed: {
        updateName() {
            return this.name + ' ' + this.lastName;
        }
    }
});

app.mount('#events');

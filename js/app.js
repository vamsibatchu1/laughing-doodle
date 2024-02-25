const app = Vue.createApp({
    data() {
        return {
            newMovie: {
                name: '',
                rating: '',
                genre: ''
            },
            movies: []
        };
    },
    methods: {
        addMovie() {
            if (this.newMovie.name && this.newMovie.rating && this.newMovie.genre) {
                const movieToAdd = { ...this.newMovie, id: Date.now() };
                this.movies.push(movieToAdd);
                this.newMovie = { name: '', rating: '', genre: '' }; // Reset newMovie
            }
        }
    }
});

app.mount('#app');

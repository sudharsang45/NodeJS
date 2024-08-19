const { EventEmitter } = require('node:events');
const API = require('./mock-api');
// To count the matches, call API.countMatches(term) where term is the search term
class Search extends EventEmitter {

    constructor() {
        super()
    }

    async searchCount(searchTerm) {
        this.emit('SEARCH_STARTED',searchTerm);
        if (!searchTerm){
            this.emit('SEARCH_ERROR', {message: 'INVALID_TERM', term: searchTerm})
        }
        else {
            try {
                const searchresults = await API.countMatches(searchTerm);
                this.emit('SEARCH_SUCCESS', {term: searchTerm, count: searchresults});
            }
            catch(err) {
                this.emit('SEARCH_ERROR', {term: searchTerm, message: err.message})
            }
        }
    }

}

module.exports = Search;
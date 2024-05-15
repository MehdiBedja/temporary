// App.js
import React from 'react';
import axios from 'axios';
import YearList from './ApiService';

// Set global Axios configuration
axios.defaults.baseURL = 'http://localhost:8000/data_collection/journals';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

function App() {
    return (
        <div className="App">
            <YearList />
        </div>
    );
}

export default App;

import WebpageList from '../WebpagesList';
import React from 'react';
import './app.scss';

const App = () => {
    return(
        <section className="container">
            <h1> My History </h1>
            <WebpageList />
        </section>    
    )
}

export default App;
import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react';

const Home = () => {

    const [data, setData] = useState([]);

    // useEffect est un hook qui va permettre de déclencher une fonction 
    // de manière asynchrone lorsque l'état du composant change.
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:3000/api/posts/',
            );

            setData(result.data);
        };
        fetchData();
    }, [])

    return (
        <Fragment>
            <ul>
                {data.map(post => (
                    <div>
                        <li key={post.userId}>
                            <p>{post._id}</p>
                            <p>{post.description}</p>
                            <p>{post.imageUrl}</p>
                        </li>
                    </div>
                ))}
            </ul>
        </Fragment>
    );
};

export default Home;
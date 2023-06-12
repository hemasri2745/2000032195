import React, { useState, useEffect } from 'react';

function NumberList(props) {
    const [numbers, setNumbers] = useState([]);

    useEffect(() => {
        const fetchNumbers = async () => {
            const requests = props.urls.map(url =>
                fetch(url)
                    .then(response => response.json())
                    .then(data => data.numbers)
                    .catch(error => {
                        console.log(`Error fetching numbers from ${url}: ${error}`);
                        return [];
                    })
            );

            try {
                const results = await Promise.all(requests);
                const mergedNumbers = results.flat().filter((number, index, array) =>
                    array.indexOf(number) === index
                );
                setNumbers(mergedNumbers.sort((a, b) => a - b));
            } catch (error) {
                console.log(`Error fetching numbers: ${error}`);
            }
        };

        fetchNumbers();
    }, [props.urls]);

    return (
        <ul>
            {numbers.map(number => (
                <li key={number}>{number}</li>
            ))}
        </ul>
    );
}

export default NumberList;

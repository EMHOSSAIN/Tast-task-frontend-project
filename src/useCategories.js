import { useEffect, useState } from 'react';


const useCategories = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch('https://test-project-emhossain.vercel.app/data')
            .then(res => res.json())
            .then(data => setCategories(data))

    }, [])

    return categories;

};

export default useCategories;

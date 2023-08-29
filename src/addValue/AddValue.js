import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';




const AddValue = ({ userData, setUserData, setIsEditing, isLoading,setIsLoading }) => {


    useEffect(() => {

        fetch('https://test-project-emhossain.vercel.app/userData')
            .then(res => res.json())
            .then(data => {
                setUserData(data)
                setIsLoading(false)
            })


    }, [setUserData])

    if (isLoading) {
        return <div className="flex items-center justify-center my-10">
            <h1 className="text-xl uppercase">Loading.....</h1>
        </div>
    }

    return (
        <div className='mt-96 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 ml-4 mr-4'>
            {
                userData.map(result => <div key={result._id} className='border-2 px-3 py-4 text-center '>
                    <h1>{result.name}</h1>
                    <h1>{result.value}</h1>
                    <Link  onClick={() => setIsEditing(true)} to={`/home/${result._id}`} ><button className=" mt-4 px-6 py-1 bg-cover bg-center bg-no-repeat bg-gradient-to-r text-xl hover:from-[#07b4e9] hover:to-[#0526a8] bg-[#076de9] from-[#0551a8] text-white rounded-lg hover:text-white" disabled={isLoading} >EDIT</button></Link>
                </div>)
            }

        </div>
    );
};

export default AddValue;
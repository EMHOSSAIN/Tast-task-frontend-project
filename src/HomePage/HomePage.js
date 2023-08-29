import React from 'react';
import { useEffect, useState } from 'react';
import AddValue from '../addValue/AddValue';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const HomePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState([])
  const [selectors, setSelector] = useState([])
  const [agree, setAgree] = useState(false);
  const data = useLoaderData({})

  // agree to term section

  const canBeSubmitted = () => {
    const isValid = agree
    if (isValid) {
      document.getElementById("submitButton").removeAttribute("disabled");
    } else {
      document.getElementById("submitButton").setAttribute("disabled", true);
    }

  }
  useEffect(() => canBeSubmitted());

  // Selector get mthhod
  useEffect(() => {

    fetch('https://test-project-emhossain.vercel.app/data')
      .then(res => res.json())
      .then(data => setSelector(data))

  }, [])


// This handler use for save and edit data conditionaly.
  const handleSubmit = (event) => {
    event.preventDefault();
   
    const form = event.target;
    const name = form.userName.value;
    const value = form.selectValue.value;

    const getValue = {
      name, value
    }


    if (isEditing) {

      fetch(`https://test-project-emhossain.vercel.app/updateData/${data?._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(getValue),

        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            
            toast('Your Data Successfully Update ')
            // alert('Your Data Successfully Update ')
            
             setIsEditing(false)
            form.reset()
            
          }
          setIsLoading(false)
          
         
        });


    } else {

      fetch("https://test-project-emhossain.vercel.app/data", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(getValue),
      })
        .then(res => res.json())
        .then(result => {


          if (result.acknowledged) {
           
           toast("You Successfully Save Data")
          //  alert("You Successfully Save Data")
            form.reset()
            setIsLoading(false)

          }
          
         
        })

    }
  };

  // if (isLoading) {
  //   <div className="flex items-center justify-center my-10">
  //               <h1 className="text-xl uppercase">Loading.....</h1>
  //           </div>
  // }

  return (
    <section className=' pt-10 bg-slate-100'>
      
         <div className=''>
     <div className="fixed w-[40%] top-0 z-50 pt-5 left-[30%] ">
        <div className='bg-gradient-to-r from-[#404f5f] to-[#99a2a9] py-3 px-4 rounded-md' >
          <p className='text-center ml-1'>Please enter your name and pick the Sectors  you are currently involved in.</p>
          <form className='mt-6 lg:ml-20' onSubmit={handleSubmit}>
            <label className='text-xl' htmlFor="Name">Name: </label>
            <input
             type='text'
             name='userName'
             placeholder='Name'
             defaultValue={data?.name}
             required
            className=" px-4 py-2 text-gray-700 border rounded bg-gray-200 lg:w-80 "
          />

            <div className='mt-4'>
              <label className='text-xl'>Sectors: </label>

              <select name='selectValue' className='px-4 py-2 text-gray-700 border rounded-2 bg-gray-200 lg:w-80 ' required   >
                <option className='selected'> {data?.value} </option>
                {
                  selectors.map(select => <option className='h-16 ' value={select.label} key={select._id}  > {select.name} </option>)
                }

              </select>
            </div>
           <div className='mt-4'>
           <input
              onClick={(e) => setAgree(e.target.checked)}
              type='radio' />
            <label className='ml-2 text-[18px]' htmlFor="Agree to terms" >Agree to terms</label> <br />
           </div>
            <button className=" mt-4 px-10 py-2 bg-cover bg-center bg-no-repeat bg-gradient-to-r text-xl hover:from-[#07b4e9] hover:to-[#0526a8] bg-[#076de9] from-[#0551a8] text-white rounded-lg hover:text-white"
             type='submit'
              id="submitButton"
            >save</button>
          </form>
      <hr className=' mt-3'/>
        </div>

      </div>
     </div>
    

      {/* show get data */}

      <AddValue

        userData={userData}
        setUserData={setUserData}
        setIsEditing={setIsEditing}
        isLoading={isLoading}
        setIsLoading={setIsLoading}


      > </AddValue>
    </section>
  );
};

export default HomePage;
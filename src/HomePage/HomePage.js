import React from 'react';
import { useEffect, useState } from 'react';
import AddValue from '../addValue/AddValue';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Form from '../Form';
import useCategories from '../useCategories';

const HomePage = () => {
  const categories = useCategories();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState([])
 
  const [isValid, setIsValid] = useState(false);
  const data = useLoaderData({})
  const navigate = useNavigate()

  // agree to term section

  const canBeSubmitted = () => {
    const btnSubmit = document.getElementById("submitButton");
    if (isValid) {
      btnSubmit.removeAttribute("disabled");
    } else {
      btnSubmit.setAttribute("disabled", true);
    }
  }
  useEffect(() => canBeSubmitted());

  // Selector get mthhod
  useEffect(() => {
    fetch('https://test-project-emhossain.vercel.app/userData')
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setUserData(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [setIsLoading, setUserData]);



 

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.userName.value;
    const value = form.selectValue.value;

    const getValue = {
      name, value
    }

    if (isEditing) {
      handleUpdateData(getValue, form)
    } else {
      handleAddNewData(getValue, form)
    }
  };

  const handleAddNewData = (formData, form) => {
    setIsLoading(true)
    fetch("https://test-project-emhossain.vercel.app/data", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(result => {
        if (result.acknowledged) {
          toast("You Successfully Save Data")
          setIsLoading(false)
          form.reset();
          const newData = [...userData, formData];
          setUserData(newData)
        }
      })
  }

  // Update data info
  const handleUpdateData = (formData, form) => {
    setIsLoading(true);
    fetch(`https://test-project-emhossain.vercel.app/updateData/${ data._id }`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updateResult) => {
        if (updateResult.modifiedCount > 0) {
          toast('Your Data Successfully Updated');
          setIsEditing(false);

          // Update the userData state with the updated data immutably
          const updatedUserData = userData.map(item => {
            if (item._id === data._id) {
              return { ...item, ...formData };
            }
            return item;
          });

          setIsLoading(false);
          form.reset();
          setUserData(updatedUserData); // Set state after performing all other operations
          navigateAfterUpdate(); // Navigate using a separate function
        }
      });
  };

  // Function to navigate after updating
  const navigateAfterUpdate = () => {
    navigate('/');
  };
 

  return (
    <section className=' pt-10 bg-slate-100'>
      
         <div className=''>
     <div className="fixed top-0 z-50 lg:w-[40%] lg:ml-96 ">
        <div className='bg-gradient-to-r from-[#404f5f] to-[#99a2a9] py-3 px-4 rounded-md' >
          <p className='text-center'>Please enter your name and pick the Sectors  you are currently involved in.</p>
          {/* <form className='mt-6 lg:ml-20' onSubmit={handleSubmit}>
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
          </form> */}

          <Form
          handleSubmit={ handleSubmit }
          data={ data }
          categories={ categories }
          setIsValid={ setIsValid }
          >

          </Form>
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
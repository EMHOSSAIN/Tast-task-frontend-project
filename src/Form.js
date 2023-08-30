const Form = ({ data, handleSubmit, categories, setIsValid }) => {
    return (
        <form className='mt-6 lg:ml-20' onSubmit={ handleSubmit }>
            <label className='text-xl' htmlFor="Name">Name: </label>
            <input
                type='text'
                name='userName'
                placeholder='Name'
                defaultValue={ data?.name }
                required
                className=" px-4 py-2 text-gray-700 border rounded bg-gray-200 lg:w-80 "
            />

            <div className='mt-4'>
                <label className='text-xl'>Sectors: </label>

                <select name='selectValue' className='px-4 py-2 text-gray-700 border rounded-2 bg-gray-200 lg:w-80 ' required   >
                    <option className='selected'> { data?.value } </option>
                    {
                        categories.map(select => <option className='h-16 ' value={ select.label } key={ select._id }  > { select.name } </option>)
                    }

                </select>
            </div>
            <div className='mt-4'>
                <input
                    onClick={ (e) => setIsValid(e.target.checked) }
                    type='radio' />
                <label className='ml-2 text-[18px]' htmlFor="Agree to terms" >Agree to terms</label> <br />
            </div>
            <button className=" mt-4 px-10 py-2 bg-cover bg-center bg-no-repeat bg-gradient-to-r text-xl hover:from-[#07b4e9] hover:to-[#0526a8] bg-[#076de9] from-[#0551a8] text-white rounded-lg hover:text-white"
                type='submit'
                id="submitButton"
            >save</button>
        </form>
    );
};

export default Form;

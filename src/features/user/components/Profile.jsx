import { useEffect, useState } from "react";
import { STATUS } from "../../../utils/constants";
import { useForm } from "react-hook-form";
import { updateUser,selectUser } from "../userSlice";
import { useDispatch,useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'

export default function Profile() {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [userDetails,setUsetDetails] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //handle form submission
  const onSubmit = (data) => {
    dispatch(updateUser(data))
  };
  
  const getUser = async()=>{
    
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("userId");

  console.log(token)
  const response = await fetch(`https://stagrecords.swasth.net/api/myprofile`, {
      method: "POST",
      body: JSON.stringify({ user_id: user_id }),
      headers: {
        "Content-Type": "application/json",
        swasthtoken: token,
      },
    });
    const d = await response.data();
    console.log(d);
  }

  useEffect(()=>{
    getUser();
  })
  if (user === null) return <Navigate to='/login' />

  return (
    <>
    {console.log(user)}
      <div className="flex justify-center items-center">
        <div className="shadow-2xl  p-10 w-[50%] border-solid border-rose-200">
          <div className="flex justify-between">
            <h3 className="text-2xl font-semibold leading-7 text-gray-900">
              {edit ? "Update Personal details" : "Personal details"}
            </h3>
            {edit ? (
              <svg
                onClick={() => {
                  setEdit(!edit);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                onClick={() => {
                  setEdit(!edit);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            )}
          </div>

          {!edit ? (
            <div className="mt-4 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-6 sm:gap-0 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Full name
                  </dt>

                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {userDetails?userDetails.first_name:"Tony"}
                  </dd>
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    last name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {userDetails?userDetails.last_name:"Stark"}
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {userDetails?userDetails.email:"tonyStark@stakindustries.com"}
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Mobile Number
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {userDetails?userDetails.mobile:"9824530000"}
                  </dd>
                </div>
              </dl>
            </div>
          ) : (
            <div className="mt-5 shadow-sm sm:mx-auto w-full  p-5 rounded-2xl">
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name & Last Name */}
                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  {/* first Name */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        autoComplete="off"
                        {...register("name", { required: "Name is required" })}
                        id="name"
                        type="text"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.name && (
                      <span className="text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last Name
                    </label>
                    <div className="mt-2">
                      <input
                        autoComplete="off"
                        {...register("lastName", {
                          required: "Last Name is required",
                        })}
                        id="lastName"
                        name="lastName"
                        type="text"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.lastName && (
                      <span className="text-red-500">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* E-mail */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      autoComplete="off"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                          message: "Email is not Valid",
                        },
                      })}
                      id="email"
                      type="email"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone-number"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Phone number
                  </label>
                  <div className="relative mt-2">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <div className="h-full rounded border-r-2 bg-transparent bg-none py-2 pl-2 pr-4 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                        +91
                      </div>
                    </div>
                    <input
                      autoComplete="off"
                      {...register("phoneNumber", {
                        required: "Phone Number is required",
                        maxLength: {
                          value: 10,
                          message: "Please Enter Valid Phone Number.",
                        },
                        pattern: {
                          value: /(\+)?(91)?( )?[789]\d{9}/,
                          message: "Please Enter Valid Phone Number.",
                        },
                      })}
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      className="block w-full rounded-md border-0 px-3.5 py-2 pl-16 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <span className="text-red-500">
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  ${
                      status === STATUS.LOADING &&
                      "bg-indigo-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
                    } `}
                  >
                    {status === STATUS.LOADING ? "Updating" : "Update"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>:
    
    </>
  );
}

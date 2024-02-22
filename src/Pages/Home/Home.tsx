import {  useEffect } from "react";
import { fetchPOSTS, selectData } from "../../slices/CounterSlice"
import { useAppDispatch, useAppSelector } from "../../slices/appHooks" 


 const Home = () => {
  const dispatch = useAppDispatch();
  const postdata = useAppSelector(selectData);

  console.log("post data ",postdata);
  
  useEffect(() => {
    dispatch(fetchPOSTS({value:0}))
  }, [dispatch])
  

  return (
    <>
    <div className="border-2 solid red">Home</div>
    {
      postdata ? <p>{postdata ? JSON.stringify(postdata) : ""}</p> : ""
    }
    </>
  )
}

export default Home;
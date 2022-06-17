import { useEffect } from "react";
import { dispatch } from "../store";
import { getJobs } from "../store/features/jobs";

/**
 * Home
 */
const Home = () => {

  useEffect(() => {
    dispatch(getJobs())
  },[])
  return <>Home</>;
};

export default Home;

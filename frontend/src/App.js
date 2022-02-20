import { Divider } from "@chakra-ui/react";
import { useState } from "react";
import CreateJobForm from "./components/CreateJobForm";
import JobList from "./components/JobList";
import Layout from "./components/Layout";
import { MainContext } from "./context";
import JobService from "./services/JobService";

function App() {
  const [jobs, setJobs] = useState(JobService.getJobList());

  let data = { jobs, setJobs };
  return (
    <>
      <MainContext.Provider value={data}>
        <Layout>
          <CreateJobForm />
          <Divider margin={"20px 0px"} />
          <JobList />
        </Layout>
      </MainContext.Provider>
    </>
  );
}

export default App;

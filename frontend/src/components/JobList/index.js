import { Divider, Heading } from "@chakra-ui/react";
import React from "react";
import ListTable from "../ListTable";

const JobList = () => {
  return (
    <>
      <Heading size="lg">Job List</Heading>
      <Divider margin={"20px 0px"} />
      <ListTable />
    </>
  );
};

export default JobList;

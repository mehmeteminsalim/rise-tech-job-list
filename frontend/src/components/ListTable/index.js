import {
  Badge,
  Box,
  Divider,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import JobListFilter from "../JobListFilter";
import DeleteJobModal from "../DeleteJobModal";
import { useContext, MainContext } from "../../context";
import UpdateJobModal from "../UpdateJobModal";

function priorityColor(value) {
  switch (value) {
    case "0":
      return "red";
    case "1":
      return "orange";
    case "2":
      return "blue";

    default:
      return "red";
  }
}

const ListTable = () => {
  const { jobs } = useContext(MainContext);
  return (
    <>
      <Box width="full" overflow="auto">
        {(jobs == [] || jobs) && (
          <>
            <JobListFilter /> <Divider margin={"20px 0px"} />
          </>
        )}

        <Table variant="simple">
          <Thead bg={"blue.500"}>
            <Tr>
              <Th textColor={"white"}>Name</Th>
              <Th textColor={"white"}>Priority</Th>
              <Th textColor={"white"} isNumeric>
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {jobs &&
              jobs.map((job) => {
                return (
                  <Tr key={job.id}>
                    <Td>{job?.name ?? "Job Name"}</Td>
                    <Td>
                      <Badge
                        colorScheme={priorityColor(job?.priority?.value ?? "0")}
                      >
                        {job?.priority?.name ?? "PriorityName"}
                      </Badge>
                    </Td>
                    <Td
                      isNumeric
                      display={"flex"}
                      justifyContent={"end"}
                      alignItems={"center"}
                    >
                      <UpdateJobModal jobId={job?.id} />
                      <DeleteJobModal jobId={job?.id} />
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default ListTable;

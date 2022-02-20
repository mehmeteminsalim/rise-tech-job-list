import { SearchIcon } from "@chakra-ui/icons";
import {
  Alert,
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MainContext, useContext } from "../../context";
import JobService from "../../services/JobService";

const JobListFilter = () => {
  const { jobs, setJobs } = useContext(MainContext);

  const [selectValue, setSelectValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    filterJobList();
  }, [selectValue, inputValue]);

  function filterJobList() {
    setJobs(JobService.filterJobList(inputValue, selectValue));
  }

  return (
    <>
      <Box width={"full"} marginBottom={5}>
        <SimpleGrid columns={[1, null, 2]} spacing="40px">
          <Box>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="text"
                placeholder="Job Name"
              />
            </InputGroup>
          </Box>
          <Box>
            <Select
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
            >
              <option value="">Choose</option>
              <option value="0">Urgent</option>
              <option value="1">Regular</option>
              <option value="2">Trivial</option>
            </Select>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default JobListFilter;

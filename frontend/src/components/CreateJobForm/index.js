import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import JobService from "../../services/JobService";
import { useContext, MainContext } from "../../context";
import { useEffect, useState } from "react";
import axios from "axios";

const schema = yup
  .object({
    jobName: yup
      .string()
      .max(255, "Job Name must be less than 255 characters")
      .required("Please Fill Job Name"),
    jobPriority: yup.string().required("Please Choose Job Priority"),
  })
  .required();

function priorityValueToName(value) {
  switch (value) {
    case "0":
      return "Urgent";
    case "1":
      return "Regular";
    case "2":
      return "Trivial";

    default:
      return "Urgent";
  }
}

const CreateJobForm = () => {
  const toast = useToast();
  const { jobs, setJobs } = useContext(MainContext);
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/priorities`).then((res) => {
      setPriorities(res.data);
    });
  }, []);

  console.log(priorities);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
    JobService.addJob({
      name: data.jobName,
      priority: {
        name: priorityValueToName(data.jobPriority),
        value: data.jobPriority,
      },
    });
    setJobs(JobService.getJobList());
    toast({
      title: "Job Added",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box margin={"30px 0px"}>
        <Heading size="lg">Create New Job</Heading>
        <Divider margin={"20px 0px"} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid
            minChildWidth="300px"
            spacing="40px"
            alignItems={"center"}
          >
            <FormControl isInvalid={errors.jobName}>
              <FormLabel htmlFor="job-name">Job Name</FormLabel>
              <Input {...register("jobName")} id="job-name" type="text" />
              {errors.jobName && (
                <FormErrorMessage>{errors.jobName?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.jobPriority}>
              <FormLabel htmlFor="job-priority">Job Priority</FormLabel>
              <Select {...register("jobPriority")} placeholder="Choose">
                <option value="0">Urgent</option>
                <option value="1">Regular</option>
                <option value="2">Trivial</option>
              </Select>
              {errors.jobPriority && (
                <FormErrorMessage>
                  {errors.jobPriority?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Create
            </Button>
          </SimpleGrid>
        </form>
      </Box>
    </>
  );
};

export default CreateJobForm;

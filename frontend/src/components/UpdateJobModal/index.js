import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { MainContext, useContext } from "../../context";
import JobService from "../../services/JobService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
  />
);

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

const UpdateJobModal = ({ jobId }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { jobs, setJobs } = useContext(MainContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      jobName: JobService.findOne(jobId).name,
      jobPriority: JobService.findOne(jobId).priority.value,
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    JobService.updateJob(jobId, {
      name: data.jobName,
      priority: {
        name: priorityValueToName(data.jobPriority),
        value: data.jobPriority,
      },
    });
    setJobs(JobService.getJobList());
    onClose();
    toast({
      title: "Job Updated",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  useEffect(() => {}, []);

  return (
    <>
      <IconButton
        marginLeft={"4"}
        colorScheme="blue"
        aria-label="Search database"
        icon={<EditIcon />}
        onClick={() => {
          onOpen();
        }}
      />

      <Modal
        closeOnOverlayClick={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Update Job</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                    <FormErrorMessage>
                      {errors.jobName?.message}
                    </FormErrorMessage>
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
                  Update
                </Button>
              </SimpleGrid>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateJobModal;

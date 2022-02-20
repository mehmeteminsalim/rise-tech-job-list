import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MainContext, useContext } from "../../context";
import JobService from "../../services/JobService";

const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
  />
);

const DeleteJobModal = ({ jobId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { jobs, setJobs } = useContext(MainContext);
  const toast = useToast();

  function deleteJob(params) {
    JobService.removeJob(jobId);
    setJobs(JobService.getJobList());
    onClose();
    toast({
      title: "Job Deleted",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <>
      <IconButton
        marginLeft={"4"}
        colorScheme="blue"
        aria-label="Search database"
        icon={<DeleteIcon />}
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
          <ModalHeader>Delete Job</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete it?</Text>
          </ModalBody>
          <ModalFooter gap={4}>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={() => deleteJob()}>
              Approve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteJobModal;

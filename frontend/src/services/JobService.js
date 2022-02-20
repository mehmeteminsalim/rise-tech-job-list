import LocalStorageService from "./LocalStorageService";
import { v4 as uuid } from "uuid";

const JobListLocalStorageName = "jobList";

class JobService extends LocalStorageService {
  constructor() {
    super();
    if (this.get(JobListLocalStorageName) !== null) {
      this.jobList = this.get(JobListLocalStorageName);
    } else {
      this.jobList = [];
    }
  }

  getJobList() {
    return this.get(JobListLocalStorageName);
  }

  addJob(job) {
    let unique_id = uuid();
    this.jobList.push({ id: unique_id, ...job });
    this.jobList.sort((a, b) => {
      if (a.priority.value < b.priority.value) {
        return -1;
      }
      if (a.priority.value > b.priority.value) {
        return 1;
      }
      return 0;
    });
    this.set(JobListLocalStorageName, this.jobList);
  }

  removeJob(jobId) {
    this.jobList = this.jobList.filter((job) => job.id !== jobId);
    this.set(JobListLocalStorageName, this.jobList);
  }

  updateJob(jobId, newJob) {
    this.jobList.map((job, index) => {
      if (job.id === jobId) {
        this.jobList[index] = { ...job, ...newJob };
      }
      console.log(job);
    });
    this.set(JobListLocalStorageName, this.jobList);
  }

  // updateJob(jobId, newJob) {
  //   let i = this.jobList.filter((job) => job.id !== jobId);
  //   if (i.length > 0) {
  //     console.log(i);
  //   }
  // }

  findOne(jobId) {
    return this.getJobList().find((job) => job.id === jobId);
  }

  //   removeCompletedTodos() {
  //     this.jobList = this.jobList.filter((todo) => !todo.isCompleted);
  //     this.set(JobListLocalStorageName, this.jobList);
  //   }

  // jobFilterByName(jobName) {
  //   if (jobName === "") {
  //     return this.getJobList();
  //   }
  //   return this.getJobList().filter((job) =>
  //     job.name.toLowerCase().includes(jobName.toLowerCase())
  //   );
  // }

  // jobFilterByPriority(priority) {
  //   if (priority === "") {
  //     return this.getJobList();
  //   }

  //   return this.getJobList().filter((job) => job.priority.value === priority);
  // }

  filterJobList(jobName, priority) {
    if (jobName === "" && priority === "") {
      return this.getJobList();
    }
    if (jobName === "") {
      return this.getJobList().filter((job) => job.priority.value === priority);
    }
    if (priority === "") {
      return this.getJobList().filter((job) =>
        job.name.toLowerCase().includes(jobName.toLowerCase())
      );
    }
    return this.getJobList().filter(
      (job) =>
        job.name.toLowerCase().includes(jobName.toLowerCase()) &&
        job.priority.value === priority
    );
  }

  removeAll() {
    this.jobList = [];
    this.set(JobListLocalStorageName, this.jobList);
  }
}

export default new JobService();

import "./Candidature.css";
import { useUser } from "../../Context/UserContext";
import { useHttpClient } from "../../hook/http-hook";
import { useEffect } from "react";
import { useState } from "react";
import ItemJob from "../itemJob/ItemJob";
const Candidature = () => {
  const { user } = useUser();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [jobApplications, setJobApplications] = useState([]);

  const getJobApplications = async () => {
    try {
      const getJobApplications = await sendRequest(
        process.env.REACT_APP_BACKEND_URL +
          "jobApplications/candidate/" +
          user.userId
      );

      console.log(getJobApplications.jobApplications[0]);

      setJobApplications(getJobApplications.jobApplications || []);
      //onsole.log(jobApplications);
    } catch (err) {
      console.log(err);
      setJobApplications([]);
    }
  };

  useEffect(() => {
    getJobApplications();
  }, []);

  return (
    <div className="job-applications-container">
      {jobApplications.length === 0 && <h1>Aucune Candidatures</h1>}
      {jobApplications.map((job) => {
        console.log(job.candidate[0]);
        return (
          <ItemJob
            key={job.id}
            job={job}
            setJobApplications={setJobApplications}
            jobApplications={jobApplications}
          />
        ); // Ajoutez une clé unique ici
      })}
    </div>
  );
};

export default Candidature;

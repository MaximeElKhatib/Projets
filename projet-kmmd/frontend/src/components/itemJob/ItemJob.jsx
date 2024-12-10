import "./ItemJob.css";

import { useHttpClient } from "../../hook/http-hook";
import { useUser } from "../../Context/UserContext";

const ItemJob = ({ job, setJobApplications, JobApplications }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { user } = useUser();

  const supprimerApplication = () => {
    const supprimerOffre = async () => {
      console.log(job._id);
      try {
        const supp = await fetch(
          process.env.REACT_APP_BACKEND_URL + "jobApplications/" + job._id,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        // Rafraîchir la liste des postulation
      } catch (err) {
        console.log(err);
      }

      // Rafraichir
      setJobApplications((prevApplications) => {
        const nvJ = prevApplications.filter((j) => j._id !== job._id);
        return nvJ;
      });
    };
    supprimerOffre();
  };

  return (
    <div className="container">
      <div className="title-container">
        <h1 className="application-title">{job.jobOffer[0].title}</h1>
      </div>

      <div className="info">
        <i className="info-icon fas fa-envelope"></i>
        <span className="info-text">{job.jobOffer[0].description}</span>
      </div>

      <div className="centerr">
        <button className="supprimerButton" onClick={supprimerApplication}>
          Supprimer ma candidature
        </button>
      </div>

      <div className="footer">
        <p>Postulée le: {new Date(job.applicationDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ItemJob;

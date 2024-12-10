import "./offerDetails.css";
import { useUser } from "../../Context/UserContext";
import { useHttpClient } from "../../hook/http-hook";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Assurez-vous que toast est importé

import "react-toastify/dist/ReactToastify.css";
const OffresDetails = ({ offre }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { user } = useUser();

  const [jobApplications, setJobApplications] = useState([]);

  console.log(user.userId);
  const fetchJobApplications = async () => {
    try {
      const getJobApplications = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "jobApplications"
      );
      console.log("Réponse de jobApplications : ", getJobApplications);
      setJobApplications(getJobApplications || []);
    } catch (err) {
      console.log(err);
      setJobApplications([]);
    }
  };

  useEffect(() => {
    fetchJobApplications();
  }, []);

  if (!offre) {
    return <p>Sélectionnez une offre pour voir les détails.</p>;
  }

  const postulation = () => {
    const fetchOffre = async () => {
      try {
        const getUser = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "candidate/" + user.userId
        );
        const newApplication = {
          candidateId: user.userId,
          jobOfferId: offre.id,
          coverLetter: "asadada",
          resume: "asdada",
          applicationStatus: "asdad",
          employerComment: "asdadas",
        };
        const application = await fetch(
          process.env.REACT_APP_BACKEND_URL + "jobApplications",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(newApplication),
          }
        );
        fetchJobApplications();
        toast.success("Merci d'avoir postulé à cette offre !");
        // Rafraîchir la liste des postulation
      } catch (err) {
        console.log(err);
      }
    };
    fetchOffre();
  };

  console.log(jobApplications.applications);

  const alreadyApplied =
    jobApplications &&
    Array.isArray(jobApplications.applications) &&
    jobApplications.applications.some(
      (job) =>
        job.jobOffer == offre.id &&
        job.candidate &&
        job.candidate[0] &&
        job.candidate[0].id === user.userId
    );

  //console.log(alreadyApplied);
  return (
    <div className="offerDetails">
      <div id="headOffer">
        <h1>{offre.title}</h1>
        <h3 id="headLE">Numéro de téléphone : {offre.employeur.phoneNumber}</h3>
        <h3 id="headLE">
          <a
            href={`https://www.google.ca/maps/place/${offre.location}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {offre.location}
          </a>
        </h3>
        <h3 id="headLE">
          {offre.salaryRange} - {offre.employmentType}{" "}
          {offre.isRemote ? " - À distance" : ""}
        </h3>
        {user && user.role === "candidat" && (
          <>
            {jobApplications && alreadyApplied ? (
              <div>Déjà postulé</div>
            ) : (
              <button onClick={postulation} id="Postuler">
                Postuler
              </button>
            )}
          </>
        )}
      </div>
      <div className="bodyOffer">
        <h2>Analyse du profil</h2>
        <h4>Compétences</h4>
        <div id="placement">
          {offre.skillsRequired.map((skill, index) => (
            <p key={index} id="besoin">
              {skill}
            </p>
          ))}
        </div>
        <hr />
        <h4>Formation</h4>
        <p id="besoin">{offre.requiredFormation}</p>
        <hr />
        <h4>Langues</h4>

        <hr />
        <h4>Expérience</h4>
        <p id="besoin">{offre.requiredExperience}</p>
        <h2>Détails du poste</h2>
        <h4>Type de poste</h4>
        <div id="placement">
          <p id="besoin">{offre.employmentType}</p>
          <p id="besoin">{offre.schedule}</p>
        </div>
        <hr />
        <h4>Lieu</h4>
        <p id="besoin">{offre.location}</p>
        <hr />
        <h4>Avantages</h4>
        <div id="placement">
          {offre.benefits.map((benefit, index) => (
            <p key={index} id="besoin">
              {benefit}
            </p>
          ))}
        </div>
        <hr />
        <h2>Description complète du poste</h2>
        <p id="besoin">{offre.description}</p>
      </div>
    </div>
  );
};
export default OffresDetails;

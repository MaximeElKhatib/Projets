import { useState, useEffect } from "react"; 
import { useHttpClient } from "../../hook/http-hook";
import { useUser } from "../../Context/UserContext";
import ItemApplication from "../itemApplication/itemApplication";
import { useParams } from "react-router-dom";
import "./jobApplication.css" ;

export default function JobApplications(props) {
    const [applications, setApplications] = useState([]) ;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { user } = useUser();
    const { paramValue } = useParams();

    useEffect(() => {
        const fetchOffre = async () => {
            try {
                // Vérifiez que paramValue n'est pas undefined
                if (!paramValue) {
                    console.error("paramValue is undefined");
                    return; // Sortir si paramValue est undefined
                }
                
                const response = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}jobApplications/${paramValue}`
                );

                setApplications(response.jobApplications); // Assurez-vous que response a cette structure
            } catch (err) {
                console.error("Une erreur est survenue lors de la récupération des candidatures.", err);
            }
        };
        fetchOffre();
    }, [sendRequest, paramValue]); // Ajoutez paramValue aux dépendances

    return (
        <div className="job-applications-container">
            {applications.map((app) => {
                return <ItemApplication key={app.id} application={app} />; // Ajoutez une clé unique ici
            })}
        </div>
    );
}

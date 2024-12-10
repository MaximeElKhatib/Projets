import { useState, useEffect } from "react";
import ItemOffre from "../itemOffre/itemOffre";
import "../pageOffre/pageOffre.css";
import OffresDetails from "../details/offerDetails";
import { useHttpClient } from "../../hook/http-hook";
import { useUser } from "../../Context/UserContext";
import Spinner from "../spinner/spinner";

export default function PageOffre(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [listOffre, setlistOffre] = useState([]);
  const { user } = useUser();
  const [detailOffre, setDetailOffre] = useState(null);

  useEffect(() => {
    const fetchOffre = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "jobOffer"
        );

        const filteredOffers =
          user && user.role === "entreprise"
            ? response.offers.filter(
                (offre) => offre.employeur.id === user.userId
              )
            : response.offers.filter((offre) => offre.isActive);

        setlistOffre(filteredOffers);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOffre();
  }, [sendRequest, user]);

  const handleDeleteOffer = (id) => {
    setlistOffre((prevList) => prevList.filter((offre) => offre.id !== id));
  };

  const afficherDetails = (offre) => {
    setDetailOffre(offre);
  };

  return (
    <div className="pageOffre">
      {isLoading ? ( // Show spinner if loading
        <Spinner />
      ) : (
        <>
          <div className="conteneur-offres">
            {listOffre.map((offre) => (
              <div key={offre.id} onClick={() => afficherDetails(offre)}>
                <div>
                  <ItemOffre offre={offre} onDelete={handleDeleteOffer} />
                </div>
              </div>
            ))}
          </div>

          <div className="conteneur-detail">
            <OffresDetails offre={detailOffre} />
          </div>
        </>
      )}
    </div>
  );
}

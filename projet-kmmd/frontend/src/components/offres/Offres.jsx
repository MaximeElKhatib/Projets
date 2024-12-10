import React from "react";
import offres from "../../Data/offer";
import OfferDetails from "../details/offerDetails";
import CreateCopie from "../createOffer/createCopie";
import ItemOffre from "../itemOffre/itemOffre";
import handleDelete from "../itemOffre/itemOffre";
export default function Offres() {
  console.log("offres data:", offres); // Check the data structure here

  return (
    <div>
      <OfferDetails offre={offres} />
      <CreateCopie offre={offres} />
      {offres.map((offre) => (
        <ItemOffre key={offre.id} offre={offre} onDelete={handleDelete} />
      ))}
    </div>
  );
}

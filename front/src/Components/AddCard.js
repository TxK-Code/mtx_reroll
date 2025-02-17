import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCard, allCards } from "../redux/actions/post.action";

import searchLogo from "../Images/.svg/search-solid.svg";

export default function AddCard() {
  const { cardSelected } = useSelector((state) => state.cardSelectedReducer);
  const { allCardsList } = useSelector(
    (state) => state.allCardsSelectedReducer
  );

  const [card, setCard] = useState({
    cardId: "",
    nameInput: "",
  });

  useEffect(() => {
    console.log("Card Updated");
  }, [card]);

  const dispatch = useDispatch();

  const handleInputAdd = (e) => {
    if (e.target.classList.contains("addCard__addinput")) {
      const newCardState = {
        ...card,
        nameInput: e.target.value.toLowerCase().replace(/\s/g, "-"),
      };
      setCard(newCardState);
    }
  };

  const handleFormAdd = (e) => {
    e.preventDefault();
    dispatch(getCard(card));
    const uploadedCard = {
      ...card,
      cardId: cardSelected[0].id,
    };
    console.log(uploadedCard);
    setCard(uploadedCard);
  };

  const handleAddCollection = (e) => {
    e.preventDefault();
    dispatch(allCards(card));
  };

  return (
    <>
      <div className="addCard">
        <div className="addCard__addBox">
          <form
            action="#"
            className="addCard__addform"
            onSubmit={handleFormAdd}
          >
            <label htmlFor="cardTitle" className="addCard__addlabel">
              Card Name :
            </label>
            <div className="addCard__adddiv">
              <input
                type="text"
                id="cardTitle"
                className="addCard__addinput"
                onChange={handleInputAdd}
              />
              <button type="submit" className="addCard__addbtn">
                <img
                  src={searchLogo}
                  alt="Search Logo"
                  className="addCard__addbtnLogo"
                />
              </button>
            </div>
          </form>
          <div>
            {cardSelected[0] != null ? (
              <div className="addCard__addresult">
                <img
                  src={cardSelected[0].image_uris.normal}
                  alt="Image de la carte"
                  className="addCard__addresultImg"
                />
                <div className="addCard__addresultDiv">
                  <h1 className="addCard__addresultTitle">
                    {cardSelected[0].printed_name
                      ? cardSelected[0].printed_name
                      : cardSelected[0].name
                      ? cardSelected[0].name
                      : ""}
                  </h1>
                  <p className="addCard__addresultDescription">
                    {cardSelected[0].printed_text
                      ? cardSelected[0].printed_text
                      : cardSelected[0].oracle_text
                      ? cardSelected[0].oracle_text
                      : ""}
                  </p>
                  <p className="addCard__addresultPrice">
                    {cardSelected[0].prices.eur
                      ? cardSelected[0].prices.eur + " €"
                      : "Prix non disponible."}
                  </p>
                  <p className="addCard__addresultPriceDescription">
                    (Daily average price)
                  </p>
                  <div className="addCard__addCollectionDiv">
                    <button
                      className="addCard__addCollectionBtn"
                      onClick={handleAddCollection}
                    >
                      Add to collection
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

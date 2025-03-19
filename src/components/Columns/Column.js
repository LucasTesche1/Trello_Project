import "./Column.scss";
import Card from "../Card/Card";
import { mapOrder } from "../../utilities/sorts";

const Column = (props) => {
  const { column = {} } = props;
  const cards = mapOrder(column.cards || [], column.cardOrder || [], "id");

  return (
    <>
      <div className="column">
        <header>{column.title || "Untitled Column"}</header>{" "}
        {/* Evita erro caso title seja undefined */}
        <ul className="card-list">
          {cards.length > 0 ? (
            cards.map((card) => <Card key={card.id} card={card} />)
          ) : (
            <p>No cards available</p>
          )}
        </ul>
        <footer>Add another card</footer>
      </div>
    </>
  );
};

export default Column;

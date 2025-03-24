import "./Card.scss";

const Card = (props) => {
  const { card } = props;

  console.log("card recebido", card);

  return (
    <>
      <div className="card-item">
        {card?.image && (
          <img className="card-cover" src={card.image} alt=""></img>
        )}
        {card?.title}
      </div>
    </>
  );
};

export default Card;

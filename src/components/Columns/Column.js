import "./Column.scss";
import Card from "../Card/Card";
import { mapOrder } from "../../utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";
import Dropdown from "react-bootstrap/Dropdown";
import ConfirmModal from "../Common/ConfirmModal";
import { useState } from "react";

const Column = (props) => {
  const { column, onCardDrop } = props;
  const cards = mapOrder(column.cards || [], column.cardOrder || [], "id");

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const toggleModal = () => {
    setIsShowModalDelete(!isShowModalDelete);
  };

  const onModalAction = (type) => {
    console.log(type);
    toggleModal();
  };
  return (
    <>
      <div className="column">
        <header className="column-drag-handle">
          <div className="column-title">{column.title}</div>
          <div className="column-dropdown">
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-basic"
                size="sm"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#">Add card</Dropdown.Item>
                <Dropdown.Item onClick={toggleModal}>
                  Delete column
                </Dropdown.Item>
                <Dropdown.Item href="#">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>
        <div className="card-list">
          <Container
            groupName="col"
            onDrop={(dropResult) => onCardDrop(dropResult, column.id)}
            getChildPayload={(index) => cards[index]}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: "card-drop-preview",
            }}
            dropPlaceholderAnimationDuration={200}
          >
            {cards &&
              cards.length > 0 &&
              cards.map((card, index) => {
                return (
                  <Draggable key={card.id}>
                    <Card card={card} />
                  </Draggable>
                );
              })}
          </Container>
        </div>
        <footer>
          <div className="footer-action">
            <i className="fa fa-plus icon"> </i>Add another card
          </div>
        </footer>
      </div>
      <ConfirmModal
        show={isShowModalDelete}
        title={"Remove a column"}
        content={`Are you sure to remove this column: ${column.title}`}
        onAction={onModalAction}
      />
    </>
  );
};

export default Column;

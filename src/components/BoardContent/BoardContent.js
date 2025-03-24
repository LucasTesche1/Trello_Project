import "./BoardContent.scss";
import Column from "../Columns/Column";
import { initData } from "../../actions/initData";
import { useState, useEffect } from "react";
import _ from "lodash";
import { mapOrder } from "../../utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardInitData = initData.board.find((item) => item.id === "board-1");
    if (boardInitData) {
      setBoard(boardInitData);

      //sort columns
      setColumns(
        mapOrder(boardInitData.columns, boardInitData.columnOrder, "id")
      );
    }
  }, []);

  const onColumnDrop = (dropResult) => {
    console.log(">>> inside onColumnDrop", dropResult);

    if (!dropResult) {
      console.error("Erro: dropResult está undefined!");
      return;
    }

    console.log("dropResult:", dropResult);
  };

  if (_.isEmpty(board)) {
    return (
      <>
        <div className="not-found">Board not found</div>
      </>
    );
  }

  return (
    <>
      <div className="board-columns">
        <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          getChildPayload={(index) => columns[index]}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "cards-drop-preview",
          }}
        >
          {columns &&
            columns.length > 0 &&
            columns.map((column, index) => (
              <Draggable key={column.id}>
                <Column column={column} />
              </Draggable>
            ))}
        </Container>
      </div>
    </>
  );
};

export default BoardContent;

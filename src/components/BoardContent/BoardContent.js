import "./BoardContent.scss";
import Column from "../Columns/Column";
import { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { mapOrder } from "../../utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "../../utilities/dragDrop";
import { v4 as uuidv4 } from "uuid";
import { listBoard, listColumns, createColumns } from "../../services/apiService";

const FIXED_BOARD_ID = "67edcc430a5f084889588849";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [isShowAddList, setIsShowAddList] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (isShowAddList === true && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowAddList]);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const boardData = await listBoard();
        const columnData = await listColumns(FIXED_BOARD_ID);
        if (boardData.length > 0) {
          setBoard(boardData[0]); 
        }
        if (columnData) {
          setColumns(mapOrder(columnData, boardData[0]?.columnOrder || [], "id"));
        }
      } catch (error) {
        console.error("Erro ao buscar o board e colunas:", error);
      }
    };
    fetchBoardData();
  }, []);

  const handleAddList = async () => {
    if (!valueInput) {
      if (inputRef && inputRef.current) inputRef.current.focus();
      return;
    }
    try {
      const newColumn = await createColumns({
        boardId: FIXED_BOARD_ID,
        name: valueInput,
        tipo:"teste"
      });
      setColumns([...columns, newColumn]);
      setValueInput("");
    } catch (error) {
      console.error("Erro ao criar coluna:", error);
    }
  };

  if (_.isEmpty(board)) {
    return <div className="not-found">Board não encontrado</div>;
  }

  return (
    <div className="board-columns">
      <Container
        orientation="horizontal"
        dragHandleSelector=".column-drag-handle"
        getChildPayload={(index) => columns[index]}
      >
        {columns && columns.length > 0 &&
          columns.map((column) => (
            <Draggable key={column.id}>
              <Column column={column} />
            </Draggable>
          ))}
      </Container>
      {isShowAddList === false ? (
        <div className="add-new-column" onClick={() => setIsShowAddList(true)}>
          <i className="fa fa-plus icon"> Adicionar outra coluna</i>
        </div>
      ) : (
        <div className="content-add-column">
          <input
            type="text"
            className="form-control"
            ref={inputRef}
            value={valueInput}
            onChange={(event) => setValueInput(event.target.value)}
          />
          <div className="group-btn">
            <button className="btn btn-success" onClick={handleAddList}>
              Adicionar uma lista
            </button>
            <i className="fa fa-times icon" onClick={() => setIsShowAddList(false)}></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardContent;

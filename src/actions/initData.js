export const initData = 
{
  "board": [
    {
      "id": "board-1",
      "name": "Meu Board",
      "tipo": "kanban",
      "lists": [
        {
          "id": "column-1",
          "boardId": "board-1",
          "name": "Todo 1",
          "order": "1",
          "cards": [
            {
              "id": "card-1",
              "listId": "column-1",
              "title": "Title of card 1",
              "description": "Some description",
              "type": "task",
              "order": "1",
              "image": "https://example.com/image.png"
            }
          ]
        }
      ]
    }
  ]
}

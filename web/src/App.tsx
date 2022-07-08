import { Box } from "@mantine/core";
import useSWR from "swr";
import { Todo } from "./components/todo";


export const ENDPOINT = "http://localhost:4000";
export interface TodoList{
  id: number,
  title: string,
  done: boolean,
  body: string
}

function App() {
  const fetcher = (url: string) =>
    fetch(`${ENDPOINT}/${url}`).then((r) => r.json());
  const { data, mutate } = useSWR<TodoList[]>("api/todos", fetcher);
  return (
    <Box>
      {JSON.stringify(data)}
      <Todo mutate={mutate}/>
    </Box>
  );
}

export default App;

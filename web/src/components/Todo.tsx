import { Button, Group, Modal, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React from "react";
import { TodoList } from "../App";

interface TodoProps {}

export const Todo = ({mutate} : any) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  });

  async function createTodo(values : {title: string, body: string}) {
    const updated = await fetch("http://localhost:4000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());
    form.reset()
    setOpen(false) 
    mutate(updated)
  }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="create todo">
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label={"Todo"}
            placeholder={"what do u want to do"}
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            mb={12}
            label={"Body"}
            placeholder={"tell me more about it"}
            {...form.getInputProps("body")}
          />
          <Button type="submit">Create todo</Button>
        </form>
      </Modal>
      <Group position="center">
        <Button onClick={() => setOpen(true)} fullWidth mb={12}>
          create todo
        </Button>
      </Group>
    </>
  );
};

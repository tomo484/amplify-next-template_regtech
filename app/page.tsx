"use client";

import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

export default function HomePage() {
  const { signOut, user } = useAuthenticator((context) => [context.user]);
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    if (user) {
      try {
        listTodos();
      } catch (error) {
        console.error("Error listing todos:", error);
      }
    }
  }, [user]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
      error: (error) => console.error("Query error:", error)
    });
  }

  return (
    <main>
      <h1>My todos</h1>
      {user && <p>Welcome, {user.username}!</p>}
      <button onClick={() => {
        try {
          client.models.Todo.create({
            content: window.prompt("Todo content"),
          });
        } catch (error) {
          console.error("Error creating todo:", error);
        }
      }}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li 
            onClick={() => {
              try {
                client.models.Todo.delete({ id: todo.id });
              } catch (error) {
                console.error("Error deleting todo:", error);
              }
            }}
            key={todo.id}
          >
            {todo.content}
          </li>
        ))}
      </ul>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}
import { useState, useEffect } from "react";

const Home = () => {
	const username = "jotavillarejo";
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");

	// Crear usuario y cargar todos
	useEffect(() => {
		// Crear usuario si no existe
		fetch(`https://playground.4geeks.com/todo/users/${username}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" }
		})
			.then((resp) => resp.json())
			.then((data) => console.log("Usuario creado:", data))
			.catch((err) => console.warn("Puede que el usuario ya exista:", err));

		// Obtener todos los todos
		fetch(`https://playground.4geeks.com/todo/users/${username}`)
			.then((resp) => resp.json())
			.then((data) => setTodos(data.todos || []))
			.catch((err) => console.error("Error cargando todos:", err));
	}, []);

	// Agregar todo
	const addTodo = (e) => {
		e.preventDefault();
		if (newTodo.trim() === "") return;

		const todo = { label: newTodo, is_done: false };

		fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
			method: "POST",
			body: JSON.stringify(todo),
			headers: { "Content-Type": "application/json" }
		})
			.then((resp) => resp.json())
			.then((data) => {
				setTodos([...todos, data]); // el backend devuelve el objeto creado
				setNewTodo("");
			})
			.catch((err) => console.error("Error creando todo:", err));
	};

	// Eliminar todo
	const removeTodo = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		})
			.then((resp) => {
				if (resp.ok) {
					setTodos(todos.filter((todo) => todo.id !== id));
				}
			})
			.catch((err) => console.error("Error borrando todo:", err));
	};

	return (
		<div className="app">
			<h1>AGENDA</h1>
			<form onSubmit={addTodo}>
				<input
					type="text"
					placeholder="Escribe tu nota aquí"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
				/>
			</form>

			<ul>
				{todos.length === 0 ? (
					<li className="empty">Añade lo que quieras recordar</li>
				) : (
					todos.map((todo) => (
						<li key={todo.id}>
							<span>{todo.label}</span>
							<button onClick={() => removeTodo(todo.id)}>X</button>
						</li>
					))
				)}
			</ul>

			{todos.length > 0 && (
				<p>
					{todos.length} nota{todos.length !== 1 ? "s" : ""} más
				</p>
			)}
		</div>
	);
};

export default Home;
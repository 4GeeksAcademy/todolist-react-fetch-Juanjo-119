import { useState } from "react";

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");

	const addTodo = (e) => {
		e.preventDefault();
		if (newTodo.trim() === "") return;
		setTodos([...todos, newTodo]);
		setNewTodo("");
	};

	const removeTodo = (index) => {
		setTodos(todos.filter((_, i) => i !== index));
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
					todos.map((todo, i) => (
						<li key={i}>
							<span>{todo}</span>
							<button onClick={() => removeTodo(i)}>X</button>
						</li>
					))
				)}
			</ul>

			{todos.length > 0 && (
				<p>{todos.length} nota{todos.length !== 1 ? "s" : ""} más</p>
			)}
		</div>
	);
};

export default Home;
<script>
	import { onMount } from 'svelte';
	
	let count = 0;
	let name = '';
	let todos = [];
	let newTodo = '';
	
	function increment() {
		count += 1;
	}
	
	function addTodo() {
		if (newTodo.trim()) {
			todos = [...todos, { id: Date.now(), text: newTodo.trim(), completed: false }];
			newTodo = '';
		}
	}
	
	function toggleTodo(id) {
		todos = todos.map(todo => 
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
	}
	
	function deleteTodo(id) {
		todos = todos.filter(todo => todo.id !== id);
	}
</script>

<svelte:head>
	<title>Weird Clock</title>
	<meta name="description" content="A beautiful static single-page application built with Svelte and Vite" />
</svelte:head>

<main>
	<header>
		<div class="led-display">
			<svg width="650" height="60" viewBox="0 15 650 60" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<!-- Define a single 7-segment digit template -->
					<g id="segment-a"><rect x="8" y="5" width="24" height="6" rx="2"/></g>
					<g id="segment-b"><rect x="32" y="8" width="6" height="24" rx="2"/></g>
					<g id="segment-c"><rect x="32" y="38" width="6" height="24" rx="2"/></g>
					<g id="segment-d"><rect x="8" y="59" width="24" height="6" rx="2"/></g>
					<g id="segment-e"><rect x="5" y="38" width="6" height="24" rx="2"/></g>
					<g id="segment-f"><rect x="5" y="8" width="6" height="24" rx="2"/></g>
					<g id="segment-g"><rect x="8" y="32" width="24" height="6" rx="2"/></g>
				</defs>

				<!-- W (using two character spaces to make a proper W) -->
				<!-- Left part of W (like an L) -->
				<g transform="translate(0, 10)" fill="#ff6b35">
					<use href="#segment-f"/>
					<use href="#segment-e"/>
					<use href="#segment-d"/>
                    <use href="#segment-c"/>
                    
				</g>
				<!-- Right part of W (like a backwards L) -->
				<g transform="translate(50, 10)" fill="#ff6b35">
					<use href="#segment-c"/>
					<use href="#segment-b"/>
					<use href="#segment-d"/>
				</g>

				<!-- E (segments: a,f,g,e,d) -->
				<g transform="translate(100, 10)" fill="#ff6b35">
					<use href="#segment-a"/>
					<use href="#segment-f"/>
					<use href="#segment-g"/>
					<use href="#segment-e"/>
					<use href="#segment-d"/>
				</g>

				<!-- I (vertical line using middle segments) -->
				<g transform="translate(150, 10)" fill="#ff6b35">
					<use href="#segment-f"/>
					<use href="#segment-e"/>
				</g>

				<!-- R (segments: a,f,g,c,b,e) -->
				<g transform="translate(200, 10)" fill="#ff6b35">
					<use href="#segment-a"/>
					<use href="#segment-f"/>
					<use href="#segment-g"/>
					<use href="#segment-c"/>
					<use href="#segment-b"/>
					<use href="#segment-e"/>
				</g>

				<!-- D (segments: a,f,e,d,c,b) -->
				<g transform="translate(250, 10)" fill="#ff6b35">
					<use href="#segment-a"/>
					<use href="#segment-f"/>
					<use href="#segment-e"/>
					<use href="#segment-d"/>
					<use href="#segment-c"/>
					<use href="#segment-b"/>
				</g>

				<!-- Space -->

				<!-- C (segments: a,f,e,d) -->
				<g transform="translate(330, 10)" fill="#ff6b35">
					<use href="#segment-a"/>
					<use href="#segment-f"/>
					<use href="#segment-e"/>
					<use href="#segment-d"/>
				</g>

				<!-- L (segments: f,e,d) -->
				<g transform="translate(380, 10)" fill="#ff6b35">
					<use href="#segment-f"/>
					<use href="#segment-e"/>
					<use href="#segment-d"/>
				</g>

				<!-- O (segments: a,f,e,d,c,b) -->
				<g transform="translate(430, 10)" fill="#ff6b35">
					<use href="#segment-a"/>
					<use href="#segment-f"/>
					<use href="#segment-e"/>
					<use href="#segment-d"/>
					<use href="#segment-c"/>
					<use href="#segment-b"/>
				</g>

				<!-- C (segments: a,f,e,d) -->
				<g transform="translate(480, 10)" fill="#ff6b35">
					<use href="#segment-a"/>
					<use href="#segment-f"/>
					<use href="#segment-e"/>
					<use href="#segment-d"/>
				</g>

				<!-- K (segments: f,g,e,c,b) -->
				<g transform="translate(530, 10)" fill="#ff6b35">
					<use href="#segment-f"/>
					<use href="#segment-g"/>
					<use href="#segment-e"/>
					<use href="#segment-c"/>
					<use href="#segment-b"/>
				</g>
			</svg>
		</div>
		<nav>
			<a href="#about">About</a>
			<a href="#settings">Settings</a>
		</nav>
	</header>

	<section class="intro">
		<h2>Welcome{name ? `, ${name}` : ''}!</h2>
		<div class="input-group">
			<label for="name">What's your name?</label>
			<input id="name" bind:value={name} placeholder="Enter your name" />
		</div>
	</section>

	<section class="counter">
		<h3>Interactive Counter</h3>
		<p>Current count: <strong>{count}</strong></p>
		<button on:click={increment}>
			Click me! 🎯
		</button>
	</section>

	<section class="todos">
		<h3>Todo List</h3>
		<div class="add-todo">
			<input 
				bind:value={newTodo} 
				placeholder="Add a new todo..." 
				on:keydown={(e) => e.key === 'Enter' && addTodo()}
			/>
			<button on:click={addTodo}>Add</button>
		</div>
		
		{#if todos.length > 0}
			<ul class="todo-list">
				{#each todos as todo (todo.id)}
					<li class="todo-item" class:completed={todo.completed}>
						<input 
							type="checkbox" 
							checked={todo.completed}
							on:change={() => toggleTodo(todo.id)}
						/>
						<span>{todo.text}</span>
						<button class="delete-btn" on:click={() => deleteTodo(todo.id)}>
							❌
						</button>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="empty">No todos yet. Add one above! 📝</p>
		{/if}
	</section>

	<footer>
		<p>Built with ❤️ using Svelte and Vite</p>
	</footer>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: black;
		min-height: 100vh;
	}

	main {
		color: white;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
        margin: 2rem;
	}

	.led-display svg {
		width: 100%;
		height: auto;
		max-width: 650px;
		filter: drop-shadow(0 0 3px #ff6b35) drop-shadow(0 0 16px #ff6b35);
		transform: skewX(-12deg);
	}

	.led-display rect {
		/* filter: drop-shadow(1px 1px 4px #ff6b35); */
	}

	nav {
		display: flex;
		gap: 1rem;
	}

	nav a {
		color: white;
		text-decoration: none;
		font-weight: 500;
		border-radius: 8px;
	}


	section {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 15px;
		padding: 2rem;
		margin-bottom: 2rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	h2, h3 {
		margin-top: 0;
		color: #fff;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-weight: 600;
	}

	input {
		padding: 0.75rem;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		background: rgba(255, 255, 255, 0.9);
		color: #333;
	}

	input::placeholder {
		color: #666;
	}

	button {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		background: #4CAF50;
		color: white;
	}

	button:hover {
		background: #45a049;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0,0,0,0.2);
	}

	.counter {
		text-align: center;
	}

	.counter p {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	.counter strong {
		color: #FFD700;
		font-size: 2rem;
	}

	.add-todo {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.add-todo input {
		flex: 1;
	}

	.todo-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.todo-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		margin-bottom: 0.5rem;
		transition: all 0.2s ease;
	}

	.todo-item:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.todo-item.completed {
		opacity: 0.6;
	}

	.todo-item.completed span {
		text-decoration: line-through;
	}

	.todo-item span {
		flex: 1;
		font-size: 1.1rem;
	}

	.delete-btn {
		background: #f44336;
		padding: 0.5rem;
		font-size: 0.8rem;
	}

	.delete-btn:hover {
		background: #da190b;
	}

	.empty {
		text-align: center;
		font-style: italic;
		opacity: 0.7;
		font-size: 1.1rem;
	}

	footer {
		text-align: center;
		margin-top: 3rem;
		padding: 2rem;
		opacity: 0.8;
	}

	@media (max-width: 768px) {
		main {
			padding: 1rem;
		}
		
		header {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}
		
		header h1 {
			font-size: 2rem;
		}
		
		nav {
			gap: 1rem;
		}
		
		nav a {
			font-size: 1rem;
			padding: 0.4rem 0.8rem;
		}
		
		section {
			padding: 1.5rem;
		}
		
		.add-todo {
			flex-direction: column;
		}
		
		.todo-item {
			flex-wrap: wrap;
		}
	}
</style>

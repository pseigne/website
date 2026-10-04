		const superlatives = [
			"Economist",
			"Historian",
			"Computer Scientist",
			"Developer",
			"Data Scientist",
			"Wisconsin Badger",
			"Athlete"
		];

		const textElement = document.querySelector('.typed');
		let wordIndex = 0;      // Tracks which word we are on
		let charIndex = 0;      // Tracks which letter we are on
		let isDeleting = false; // Tracks if we are deleting or typing

		// Time configuration (in milliseconds)
		const typeSpeed = 100;  // Speed of typing
		const deleteSpeed = 50;   // Speed of deleting
		const pauseTime = 1500;   // Pause at the end of the word

		function type() {
			const currentWord = superlatives[wordIndex];

			if (isDeleting) {
				// Remove a character
				textElement.textContent = currentWord.substring(0, charIndex - 1);
				charIndex--;
				var currentSpeed = deleteSpeed;

			} else {
				// Add a character
				textElement.textContent = currentWord.substring(0, charIndex + 1);
				charIndex++;
				var currentSpeed = typeSpeed;
			}

			// --- Logic to handle switching states ---

			if (!isDeleting && charIndex === currentWord.length) {
				// Finished typing the word, now pause and start deleting
				currentSpeed = pauseTime;
				isDeleting = true;

			} else if (isDeleting && charIndex === 0) {
				// Finished deleting, move to the next word and start typing again
				isDeleting = false;
				wordIndex = (wordIndex + 1) % superlatives.length; // Loop index

			} else if (isDeleting && charIndex > 0) {
				// Currently deleting, use the delete speed
				currentSpeed = deleteSpeed;
			}


			// Recursively call the function after the calculated delay
			setTimeout(type, currentSpeed);
		}

		// Start the process immediately
		document.addEventListener('DOMContentLoaded', type);
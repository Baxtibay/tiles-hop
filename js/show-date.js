const dateElement = document.getElementById('dateDisplay')
	let currentDate = new Date()

	// Sanani formatlash
	function formatDate(date) {
		let day = String(date.getDate()).padStart(2, '0')
		let month = String(date.getMonth() + 1).padStart(2, '0') // Oylar 0 dan boshlanadi
		let year = date.getFullYear()
		return `${day}.${month}.${year}`
	}

	// Sanani yangilash
	function updateDateDisplay() {
		dateElement.textContent = formatDate(currentDate)
	}

	// G'ildirak aylantirish hodisasi
	dateElement.addEventListener('wheel', (event) => {
		event.preventDefault()
		if (event.deltaY < 0) {
			// Tepaga burash - o'tgan kun
			currentDate.setDate(currentDate.getDate() - 1)
		} else {
			// Pastga burash - kelasi kun
			currentDate.setDate(currentDate.getDate() + 1)
		}
		updateDateDisplay()
	})

	// Sana ustiga bosilganda buferga nusxalash
	dateElement.addEventListener('click', () => {
		navigator.clipboard.writeText(dateElement.textContent).then(() => {
			let modal = document.getElementById("modal")
		modal.style.display = "block"
		setTimeout(function () {
				modal.style.display = "none"
			}, 2000)
		})
	})

	// Dastlabki sanani ko'rsatish
	updateDateDisplay();
const dropArea = document.getElementById("drop-area")
const fileInput = document.getElementById("excelFile")
let activeButton = null
let excelData = []

dropArea.addEventListener("click", () => fileInput.click())
dropArea.addEventListener("dragover", (e) => {
	e.preventDefault()
	dropArea.classList.add("highlight")
})
dropArea.addEventListener("dragleave", () => dropArea.classList.remove("highlight"))
dropArea.addEventListener("drop", (e) => {
	e.preventDefault()
	dropArea.classList.remove("highlight")
	const file = e.dataTransfer.files[0]
	fileInput.files = e.dataTransfer.files
	handleFile(file)
})

fileInput.addEventListener("change", (event) => {
	const file = event.target.files[0]
	handleFile(file)
})

function handleFile(file) {
	if (!file) return
	const reader = new FileReader()
	reader.readAsArrayBuffer(file)
	reader.onload = function (event) {
		const data = new Uint8Array(event.target.result)
		const workbook = XLSX.read(data, { type: 'array' })
		const sheetName = workbook.SheetNames[0]
		const sheet = workbook.Sheets[sheetName]
		excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 })
		createButtons(excelData)
	}
}

function createButtons(data) {
	const container = document.getElementById('buttonsContainer')
	container.innerHTML = ''
	data.forEach((row, index) => {
		if (row.length > 0) {
			const button = document.createElement('button')
			button.textContent = `Row ${index + 1}`
			button.className = 'button'
			button.addEventListener('click', function () {
				setActiveButton(button, row)
			})
			container.appendChild(button)
		}
	})
}

function setActiveButton(button, row) {
	if (activeButton) {
		activeButton.classList.remove("active")
	}
	button.classList.add("active")
	activeButton = button
	document.getElementById('display1').textContent = row[0] || ''
	document.getElementById('display2').textContent = row[1] || ''
	document.getElementById('display3').textContent = row[2] || ''
	document.getElementById('display4').textContent = row[3] || ''
	// Show information in the excel 8-column
	let extraContainer = document.getElementById("extraDataContainer")
	if (!extraContainer) {
		extraContainer = document.createElement("div")
		extraContainer.id = "extraDataContainer"
		document.querySelector(".extraDataContainer-wrapper").appendChild(extraContainer)
	}
	extraContainer.textContent = `Video name: ${row[7] || "N/A"}`
}


// Copy EXTRA DATA to clipboard
function copyExtraData() {
	const textToCopy = this.textContent.replace("Video name: ", "") // Copy only value
	navigator.clipboard.writeText(textToCopy).then(() => {
		copyText("Copied!")
	})
}


// SHOW MODAL Copy clipboard
function copyText(text) {
	navigator.clipboard.writeText(text).then(() => {
		let modal = document.getElementById("modal")
		modal.style.display = "block"
		setTimeout(function () {
			modal.style.display = "none"
		}, 2000)
	})
}


// ROTATE INPUT FUNCTION 
document.getElementById('numberInput').addEventListener('input', calculateResult)
document.getElementById('multiplierSelect').addEventListener('change', calculateResult);

function calculateResult() {
	let inputValue = parseFloat(document.getElementById('numberInput').value) || 0
	let multiplier = parseInt(document.getElementById('multiplierSelect').value)
	let result = inputValue + (360 * multiplier)
	document.getElementById('result').innerText = result
	document.getElementById('result').classList.add('bg-color')
}


// REMOVE INPUT value
const elResult = document.querySelector('#result')
if(elResult) {
	elResult.addEventListener('click', () => {
		let inputField = document.getElementById('numberInput')
		inputField.value = ""
	})
}

// CLICK FOR COPY CLIPBOARD
document.querySelector(".copy-text").addEventListener("click", function() {
	copyClipboard(this.textContent)
});

// CLICK FOR COPY CLIPBOARD
document.querySelector("#result").addEventListener("click", function() {
	copyClipboard(this.textContent)
});


// **Clipboard function**
function copyClipboard(text) {
	navigator.clipboard.writeText(text).then(() => {
		let modal = document.getElementById("modal")
		modal.style.display = "block"
		setTimeout(function () {
			modal.style.display = "none"
		}, 2000)
	})
}
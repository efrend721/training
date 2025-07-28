import './style.css'

// Function to setup the name toggle functionality
function setupNameToggle(buttonElement) {
  let showingErvis = true
  const nameDisplay = document.querySelector('#nameDisplay')
  
  const updateName = () => {
    if (showingErvis) {
      nameDisplay.innerHTML = 'Hola Ervis'
    } else {
      nameDisplay.innerHTML = 'Hola Pedro'
    }
  }
  
  buttonElement.addEventListener('click', () => {
    showingErvis = !showingErvis
    updateName()
  })
  
  // Initialize with "Hola Ervis"
  updateName()
}

document.querySelector('#app').innerHTML = `
  <div>
    <h1 id="nameDisplay" style="user-select: none;">Hola Ervis</h1>
    <button id="changeNameBtn" style="padding: 10px 20px; margin-top: 10px; cursor: pointer;">Change Name</button>
  </div>
`

setupNameToggle(document.querySelector('#changeNameBtn'))

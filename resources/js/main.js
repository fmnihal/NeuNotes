// 1. Initialize the Neutralino.js client
Neutralino.init();

// 2. Add an event listener for when the window is closed
function onWindowClose() {
  Neutralino.app.exit();
}
Neutralino.events.on("windowClose", onWindowClose);

// --- Our New Code Starts Here ---

// 3. Define the file we'll save to
// NL_PATH is a special variable for the app's root directory.
const NOTES_FILE = `${NL_PATH}/notes.txt`;

// 4. Get our new HTML elements
let noteArea = document.getElementById('note-area');
let saveButton = document.getElementById('save-btn');
let loadButton = document.getElementById('load-btn');
let statusMessage = document.getElementById('status-message');

// 5. Create the function to save notes
async function saveNotes() {
  try {
    let content = noteArea.value;
    await Neutralino.filesystem.writeFile(NOTES_FILE, content);
    
    // Show a success message
    statusMessage.innerText = "Notes saved successfully!";
    statusMessage.style.color = "green";

  } catch (err) {
    console.error(err);
    statusMessage.innerText = "Error saving notes.";
    statusMessage.style.color = "red";
  }
}

// 6. Create the function to load notes
async function loadNotes() {
  try {
    let content = await Neutralino.filesystem.readFile(NOTES_FILE);
    noteArea.value = content;

    statusMessage.innerText = "Notes loaded successfully!";
    statusMessage.style.color = "green";

  } catch (err) {
    // This 'catch' block will run if the file doesn't exist yet
    console.error(err);
    statusMessage.innerText = "Could not load notes (file may not exist yet).";
    statusMessage.style.color = "red";
  }
}

// 7. Add click event listeners to our buttons
saveButton.addEventListener('click', saveNotes);
loadButton.addEventListener('click', loadNotes);
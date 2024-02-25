// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2Ae4pHPt0jZgUv57854Ol6fFcHLQACew",
    authDomain: "laughing-doodle-b1fb0.firebaseapp.com",
    databaseURL: "https://laughing-doodle-b1fb0-default-rtdb.firebaseio.com",
    projectId: "laughing-doodle-b1fb0",
    storageBucket: "laughing-doodle-b1fb0.appspot.com",
    messagingSenderId: "111885939145",
    appId: "1:111885939145:web:17be249a9b23ddaffbf818",
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Reference to your database
  const database = firebase.database();
  
  // Function to submit URL to Firebase
  function submitUrl(urlData) {
    // Generate a new unique key for each submission
    const newUrlKey = database.ref().child('urls').push().key;
  
    // Write the new URL's data simultaneously in the URLs list.
    const updates = {};
    updates['/urls/' + newUrlKey] = urlData;
  
    return database.ref().update(updates);
  }
  
  // Function to load URLs from Firebase
  function loadUrls() {
    const urlsRef = database.ref('urls');
    urlsRef.on('value', (snapshot) => {
      const urls = snapshot.val();
      const urlsTableBody = document.getElementById('urlsTable').getElementsByTagName('tbody')[0];
      urlsTableBody.innerHTML = ''; // Clear current content
      for (const key in urls) {
        if (urls.hasOwnProperty(key)) {
          addUrlToTable(urls[key]);
        }
      }
    });
  }
  
  // Event listener for form submission
  document.getElementById('urlForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const urlInput = document.getElementById('urlInput').value;
    const urlType = document.getElementById('urlType').value;
    const trainedDate = new Date().toISOString();
  
    if (urlInput.trim() !== '') {
      const urlData = { date: trainedDate, url: urlInput, type: urlType };
  
      submitUrl(urlData);
  
      document.getElementById('urlInput').value = ''; // Reset the input field
    }
  });
  
  // Call loadUrls on page load to display already stored URLs
  document.addEventListener('DOMContentLoaded', loadUrls);
  
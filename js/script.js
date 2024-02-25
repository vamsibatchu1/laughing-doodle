document.addEventListener('DOMContentLoaded', function() {
    loadUrls(); // Load stored URLs on document ready
});

document.getElementById('urlForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting in the traditional way

    // Get input values
    const urlInput = document.getElementById('urlInput').value; // Corrected variable name here
    const urlType = document.getElementById('urlType').value;

    // Only proceed if URL is not empty
    if (urlInput.trim() !== '') {
        const trainedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const urlData = { date: trainedDate, url: urlInput, type: urlType };

        // Add URL to list and table
        addUrlToList(urlData);
    }
});

function loadUrls() {
    // Retrieve URLs from localStorage and parse them
    const urls = JSON.parse(localStorage.getItem('trainedUrls') || '[]');
    urls.forEach(url => addUrlToTable(url));
}

function addUrlToList(urlData) {
    // Retrieve existing URLs, add new one, and save back to localStorage
    const urls = JSON.parse(localStorage.getItem('trainedUrls') || '[]');
    urls.push(urlData);
    localStorage.setItem('trainedUrls', JSON.stringify(urls));

    // Also add to table directly
    addUrlToTable(urlData);

    // Clear input after adding
    document.getElementById('urlInput').value = '';
    document.getElementById('urlType').value = 'design'; // Reset to default or keep as is based on your preference
}

function addUrlToTable(urlData) {
    const tableBody = document.getElementById('urlsTable').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow(tableBody.rows.length); // Insert at the end of the table

    // Fill in the row with new data
    newRow.insertCell(0).textContent = urlData.date;
    newRow.insertCell(1).textContent = urlData.url;
    newRow.insertCell(2).textContent = urlData.type.charAt(0).toUpperCase() + urlData.type.slice(1); // Capitalize the first letter
}

document.addEventListener('DOMContentLoaded', loadUrls);
document.getElementById('urlForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const urlInput = document.getElementById('urlInput');
    const urlTypeSelect = document.getElementById('urlType');
    const url = urlInput.value;
    const urlType = urlTypeSelect.value;
    if (url && urlType) {
        const trainedDate = new Date().toLocaleDateString();
        addUrlToList({ date: trainedDate, url: url, type: urlType });
        urlInput.value = ''; // Clear input after submission
    }
});

function loadUrls() {
    const urls = JSON.parse(localStorage.getItem('trainedUrls') || '[]');
    urls.forEach(url => addUrlToTable(url));
}

function addUrlToList(urlData) {
    const urls = JSON.parse(localStorage.getItem('trainedUrls') || '[]');
    urls.push(urlData);
    localStorage.setItem('trainedUrls', JSON.stringify(urls));
    addUrlToTable(urlData);
}

function addUrlToTable(urlData) {
    const tableBody = document.getElementById('urlsTable').getElementsByTagName('tbody')[0];
    const row = tableBody.insertRow();
    const dateCell = row.insertCell(0);
    const urlCell = row.insertCell(1);
    const typeCell = row.insertCell(2);
    dateCell.textContent = urlData.date;
    urlCell.textContent = urlData.url;
    typeCell.textContent = urlData.type.charAt(0).toUpperCase() + urlData.type.slice(1);
}

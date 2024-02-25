document.getElementById('urlForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value;
    if (url) {
        addUrlToList(url);
        urlInput.value = ''; // Clear input after submission
    }
});

function addUrlToList(url) {
    const urlsElement = document.getElementById('urls');
    const li = document.createElement('li');
    li.textContent = url;
    urlsElement.appendChild(li);
}

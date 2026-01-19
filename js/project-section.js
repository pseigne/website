fetch('project-section.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('project-placeholder').innerHTML = html;
    });
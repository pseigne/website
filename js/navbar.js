fetch('navbar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('navbar-placeholder').innerHTML = html;

        const resumeDownloadLink = document.getElementById('resume-download-link');
        if (resumeDownloadLink) {
            resumeDownloadLink.addEventListener('click', (event) => {
                const shouldDownload = window.confirm('Do you want to download your resume?');
                if (!shouldDownload) {
                    event.preventDefault();
                }
            });
        }
    });

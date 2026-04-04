


document.addEventListener('DOMContentLoaded', (event) => {

    setUpHTML = `        
    <div class="container">
            <div class="section-title">
                Coding Projects
            </div>
            <div class="coding-grid">
                <!-- Projects will be inserted here by JavaScript -->
            </div>
        </div>`

    document.getElementById('coding-projects').innerHTML = setUpHTML;
    displayProjects(codingProjects, '.coding-grid');

    setUpHTML = `        
    <div class="container">
            <div class="section-title">
                Writing Projects
            </div>
            <div class="writing-grid">
                <!-- Projects will be inserted here by JavaScript -->
            </div>
        </div>`

    document.getElementById('writing-projects').innerHTML = setUpHTML;
    displayProjects(writingProjects, '.writing-grid');

    setUpHTML = `        
    <div class="container">
            <div class="section-title">
                Data Projects
            </div>
            <div class="data-grid">
                <!-- Projects will be inserted here by JavaScript -->
            </div>
        </div>`

    document.getElementById('data-projects').innerHTML = setUpHTML;
    displayProjects(dataProjects, '.data-grid');
});




function displayProjects(projects, gridSelector) {
    for (let project of projects) {
        // create car ekement
        const projectCard = document.createElement('div');
        projectCard.className = 'card dark';

        // create card header
        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';

        // create card title
        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = project.title;

        // create card header date
        const cardDate = document.createElement('div');
        cardDate.className = 'card-date';
        cardDate.textContent = project.date;

        // Add them to the DOM
        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(cardDate);
        projectCard.appendChild(cardHeader);

        // Add Card Description
        const cardDesc = document.createElement('p');
        cardDesc.className = 'card-desc';
        cardDesc.textContent = project.description;
        projectCard.appendChild(cardDesc);

        // Add Tags 
        const tagAndBtnContainer = document.createElement('div');
        tagAndBtnContainer.className = 'tag-and-btn-container';

        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'tags';

        for (let tagText of project.tags) {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = tagText;
            tagsContainer.appendChild(tag);
        }



        tagAndBtnContainer.appendChild(tagsContainer);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const viewButton = document.createElement('a');
        viewButton.className = 'view-live-btn';
        viewButton.href = project.link;

        if (!project.coding) {
            viewButton.textContent = 'View';

        }
        if (project.coding) {
            viewButton.textContent = 'View Live';


        }
        viewButton.target = '_blank';
        buttonContainer.appendChild(viewButton);

        if (project.about) {
            const moreInfoButton = document.createElement('a');
            moreInfoButton.className = 'more-info-btn';
            moreInfoButton.href = project.about;
            moreInfoButton.textContent = 'About';
            buttonContainer.appendChild(moreInfoButton);
        }

        tagAndBtnContainer.appendChild(buttonContainer);
        projectCard.appendChild(tagAndBtnContainer);
        document.querySelector(gridSelector).appendChild(projectCard);
    }
}

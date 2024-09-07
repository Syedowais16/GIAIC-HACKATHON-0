document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher') as HTMLButtonElement;
    const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
    const resumeContent = document.getElementById('resume-content') as HTMLDivElement;
    const fileInput = document.getElementById('file-input') as HTMLInputElement;

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const icon = themeSwitcher.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon?.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon?.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', function(event) {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const profilePicture = document.getElementById('profile-picture') as HTMLImageElement;
                    profilePicture.src = e.target?.result as string;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (resumeForm) {
        resumeForm.addEventListener('submit', (event) => { 
            event.preventDefault(); 
            generateResume(); 
        });

        document.getElementById('add-education')?.addEventListener('click', addEducationField);
        document.getElementById('add-work')?.addEventListener('click', addWorkField);
        document.getElementById('add-project')?.addEventListener('click', addProjectField);

        document.getElementById('toggle-education')?.addEventListener('click', () => toggleSection('education-fields'));
        document.getElementById('toggle-work')?.addEventListener('click', () => toggleSection('work-experience-fields'));
        document.getElementById('toggle-projects')?.addEventListener('click', () => toggleSection('projects-fields'));
        document.getElementById('shuffle-skills')?.addEventListener('click', shuffleSkills);
    }

    function generateResume() {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const title = (document.getElementById('title') as HTMLInputElement).value;

        (document.getElementById('sidebar-name') as HTMLElement).innerText = name;
        (document.getElementById('sidebar-email') as HTMLElement).innerText = email;
        (document.getElementById('sidebar-phone') as HTMLElement).innerText = phone;
        (document.getElementById('sidebar-title') as HTMLElement).innerText = title;

        resumeContent.innerHTML = '';

        const educationItems = document.querySelectorAll('.education-item');
        let educationHtml = '';
        for (let i = 0; i < educationItems.length; i++) {
            const item = educationItems[i];
            const institution = (item.querySelector('.edu-institution') as HTMLInputElement).value;
            const degree = (item.querySelector('.edu-degree') as HTMLInputElement).value;
            const years = (item.querySelector('.edu-years') as HTMLInputElement).value;
            educationHtml += `<li contenteditable="true"><strong>${institution}</strong> - ${degree} (${years})</li>`;
        }

        const workItems = document.querySelectorAll('.work-item');
        let workHtml = '';
        for (let i = 0; i < workItems.length; i++) {
            const item = workItems[i];
            const company = (item.querySelector('.work-company') as HTMLInputElement).value;
            const role = (item.querySelector('.work-role') as HTMLInputElement).value;
            const years = (item.querySelector('.work-years') as HTMLInputElement).value;
            workHtml += `<li contenteditable="true"><strong>${company}</strong> - ${role} (${years})</li>`;
        }

        const projectItems = document.querySelectorAll('.project-item');
        let projectHtml = '';
        for (let i = 0; i < projectItems.length; i++) {
            const item = projectItems[i];
            const projectName = (item.querySelector('.project-name') as HTMLInputElement).value;
            const projectDescription = (item.querySelector('.project-description') as HTMLInputElement).value;
            projectHtml += `<li contenteditable="true"><strong>${projectName}</strong>: ${projectDescription}</li>`;
        }

        const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',')
            .map(skill => `<span class="skill" contenteditable="true">${skill.trim()}</span>`).join('');

        resumeContent.innerHTML = `
            <h2 contenteditable="true" id="editable-name">${name}</h2>
            <p contenteditable="true" id="editable-title">Title: ${title}</p>
            <p contenteditable="true" id="editable-email">Email: ${email}</p>
            <p contenteditable="true" id="editable-phone">Phone: ${phone}</p>
            <section id="education" class="editable-section">
                <h2>Education</h2>
                <ul>${educationHtml}</ul>
            </section>
            <section id="skills" class="editable-section">
                <h2>Skills</h2>
                <div class="skills-list">${skills}</div>
            </section>
            <section id="work-experience" class="editable-section">
                <h2>Work Experience</h2>
                <ul>${workHtml}</ul>
            </section>
            <section id="projects" class="editable-section">
                <h2>Projects</h2>
                <ul>${projectHtml}</ul>
            </section>
        `;
        attachEditListeners();

        resumeForm.classList.add('hidden');
        resumeContent.classList.remove('hidden');
    }

    function attachEditListeners() {
        const nameElement = document.getElementById('editable-name') as HTMLElement;
        const titleElement = document.getElementById('editable-title') as HTMLElement;
        const emailElement = document.getElementById('editable-email') as HTMLElement;
        const phoneElement = document.getElementById('editable-phone') as HTMLElement;

        nameElement.addEventListener('input', () => updateField('name', nameElement.innerText, 'sidebar-name'));
        titleElement.addEventListener('input', () => updateField('title', titleElement.innerText, 'sidebar-title'));
        emailElement.addEventListener('input', () => updateField('email', emailElement.innerText, 'sidebar-email'));
        phoneElement.addEventListener('input', () => updateField('phone', phoneElement.innerText, 'sidebar-phone'));
    }

    function updateField(inputId: string, value: string, sidebarId: string) {
        (document.getElementById(inputId) as HTMLInputElement).value = value;
        (document.getElementById(sidebarId) as HTMLElement).innerText = value;
    }

    function addEducationField() {
        const educationFields = document.getElementById('education-fields')!;
        const newEducation = document.createElement('div');
        newEducation.className = 'education-item';
        newEducation.innerHTML = `
            <label for="edu-institution">Institution:</label>
            <input type="text" class="edu-institution" required><br>
            
            <label for="edu-degree">Degree:</label>
            <input type="text" class="edu-degree" required><br>
            
            <label for="edu-years">Years:</label>
            <input type="text" class="edu-years" required><br>
        `;
        educationFields.appendChild(newEducation);
    }

    function addWorkField() {
        const workFields = document.getElementById('work-experience-fields')!;
        const newWork = document.createElement('div');
        newWork.className = 'work-item';
        newWork.innerHTML = `
            <label for="work-company">Company:</label>
            <input type="text" class="work-company" required><br>
            
            <label for="work-role">Role:</label>
            <input type="text" class="work-role" required><br>
            
            <label for="work-years">Years:</label>
            <input type="text" class="work-years" required><br>
        `;
        workFields.appendChild(newWork);
    }

    function addProjectField() {
        const projectsFields = document.getElementById('projects-fields')!;
        const newProject = document.createElement('div');
        newProject.className = 'project-item';
        newProject.innerHTML = `
            <label for="project-name">Project Name:</label>
            <input type="text" class="project-name" required><br>
            
            <label for="project-description">Description:</label>
            <input type="text" class="project-description" required><br>
        `;
        projectsFields.appendChild(newProject);
    }

    function toggleSection(sectionId: string) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.toggle('hidden');
        }
    }

    function shuffleSkills() {
        const skillsInput = document.getElementById('skills') as HTMLInputElement;
        const skills = skillsInput.value.split(',').map(skill => skill.trim()).filter(skill => skill);
        for (let i = skills.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [skills[i], skills[j]] = [skills[j], skills[i]];
        }
        skillsInput.value = skills.join(', ');
    }
});

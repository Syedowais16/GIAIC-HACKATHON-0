document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c, _d, _e, _f, _g;
    var themeSwitcher = document.getElementById('theme-switcher');
    var resumeForm = document.getElementById('resume-form');
    var resumeContent = document.getElementById('resume-content');
    var fileInput = document.getElementById('file-input');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', function () {
            document.body.classList.toggle('dark-theme');
            var icon = themeSwitcher.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon === null || icon === void 0 ? void 0 : icon.classList.replace('fa-moon', 'fa-sun');
            }
            else {
                icon === null || icon === void 0 ? void 0 : icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }
    if (fileInput) {
        fileInput.addEventListener('change', function (event) {
            var _a;
            var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var _a;
                    var profilePicture = document.getElementById('profile-picture');
                    profilePicture.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    if (resumeForm) {
        resumeForm.addEventListener('submit', function (event) {
            event.preventDefault();
            generateResume();
        });
        (_a = document.getElementById('add-education')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', addEducationField);
        (_b = document.getElementById('add-work')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', addWorkField);
        (_c = document.getElementById('add-project')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', addProjectField);
        (_d = document.getElementById('toggle-education')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return toggleSection('education-fields'); });
        (_e = document.getElementById('toggle-work')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () { return toggleSection('work-experience-fields'); });
        (_f = document.getElementById('toggle-projects')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function () { return toggleSection('projects-fields'); });
        (_g = document.getElementById('shuffle-skills')) === null || _g === void 0 ? void 0 : _g.addEventListener('click', shuffleSkills);
    }
    function generateResume() {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var title = document.getElementById('title').value;
        document.getElementById('sidebar-name').innerText = name;
        document.getElementById('sidebar-email').innerText = email;
        document.getElementById('sidebar-phone').innerText = phone;
        document.getElementById('sidebar-title').innerText = title;
        resumeContent.innerHTML = '';
        var educationItems = document.querySelectorAll('.education-item');
        var educationHtml = '';
        for (var i = 0; i < educationItems.length; i++) {
            var item = educationItems[i];
            var institution = item.querySelector('.edu-institution').value;
            var degree = item.querySelector('.edu-degree').value;
            var years = item.querySelector('.edu-years').value;
            educationHtml += "<li contenteditable=\"true\"><strong>".concat(institution, "</strong> - ").concat(degree, " (").concat(years, ")</li>");
        }
        var workItems = document.querySelectorAll('.work-item');
        var workHtml = '';
        for (var i = 0; i < workItems.length; i++) {
            var item = workItems[i];
            var company = item.querySelector('.work-company').value;
            var role = item.querySelector('.work-role').value;
            var years = item.querySelector('.work-years').value;
            workHtml += "<li contenteditable=\"true\"><strong>".concat(company, "</strong> - ").concat(role, " (").concat(years, ")</li>");
        }
        var projectItems = document.querySelectorAll('.project-item');
        var projectHtml = '';
        for (var i = 0; i < projectItems.length; i++) {
            var item = projectItems[i];
            var projectName = item.querySelector('.project-name').value;
            var projectDescription = item.querySelector('.project-description').value;
            projectHtml += "<li contenteditable=\"true\"><strong>".concat(projectName, "</strong>: ").concat(projectDescription, "</li>");
        }
        var skills = document.getElementById('skills').value.split(',')
            .map(function (skill) { return "<span class=\"skill\" contenteditable=\"true\">".concat(skill.trim(), "</span>"); }).join('');
        resumeContent.innerHTML = "\n            <h2 contenteditable=\"true\" id=\"editable-name\">".concat(name, "</h2>\n            <p contenteditable=\"true\" id=\"editable-title\">Title: ").concat(title, "</p>\n            <p contenteditable=\"true\" id=\"editable-email\">Email: ").concat(email, "</p>\n            <p contenteditable=\"true\" id=\"editable-phone\">Phone: ").concat(phone, "</p>\n            <section id=\"education\" class=\"editable-section\">\n                <h2>Education</h2>\n                <ul>").concat(educationHtml, "</ul>\n            </section>\n            <section id=\"skills\" class=\"editable-section\">\n                <h2>Skills</h2>\n                <div class=\"skills-list\">").concat(skills, "</div>\n            </section>\n            <section id=\"work-experience\" class=\"editable-section\">\n                <h2>Work Experience</h2>\n                <ul>").concat(workHtml, "</ul>\n            </section>\n            <section id=\"projects\" class=\"editable-section\">\n                <h2>Projects</h2>\n                <ul>").concat(projectHtml, "</ul>\n            </section>\n        ");
        attachEditListeners();
        resumeForm.classList.add('hidden');
        resumeContent.classList.remove('hidden');
    }
    function attachEditListeners() {
        var nameElement = document.getElementById('editable-name');
        var titleElement = document.getElementById('editable-title');
        var emailElement = document.getElementById('editable-email');
        var phoneElement = document.getElementById('editable-phone');
        nameElement.addEventListener('input', function () { return updateField('name', nameElement.innerText, 'sidebar-name'); });
        titleElement.addEventListener('input', function () { return updateField('title', titleElement.innerText, 'sidebar-title'); });
        emailElement.addEventListener('input', function () { return updateField('email', emailElement.innerText, 'sidebar-email'); });
        phoneElement.addEventListener('input', function () { return updateField('phone', phoneElement.innerText, 'sidebar-phone'); });
    }
    function updateField(inputId, value, sidebarId) {
        document.getElementById(inputId).value = value;
        document.getElementById(sidebarId).innerText = value;
    }
    function addEducationField() {
        var educationFields = document.getElementById('education-fields');
        var newEducation = document.createElement('div');
        newEducation.className = 'education-item';
        newEducation.innerHTML = "\n            <label for=\"edu-institution\">Institution:</label>\n            <input type=\"text\" class=\"edu-institution\" required><br>\n            \n            <label for=\"edu-degree\">Degree:</label>\n            <input type=\"text\" class=\"edu-degree\" required><br>\n            \n            <label for=\"edu-years\">Years:</label>\n            <input type=\"text\" class=\"edu-years\" required><br>\n        ";
        educationFields.appendChild(newEducation);
    }
    function addWorkField() {
        var workFields = document.getElementById('work-experience-fields');
        var newWork = document.createElement('div');
        newWork.className = 'work-item';
        newWork.innerHTML = "\n            <label for=\"work-company\">Company:</label>\n            <input type=\"text\" class=\"work-company\" required><br>\n            \n            <label for=\"work-role\">Role:</label>\n            <input type=\"text\" class=\"work-role\" required><br>\n            \n            <label for=\"work-years\">Years:</label>\n            <input type=\"text\" class=\"work-years\" required><br>\n        ";
        workFields.appendChild(newWork);
    }
    function addProjectField() {
        var projectsFields = document.getElementById('projects-fields');
        var newProject = document.createElement('div');
        newProject.className = 'project-item';
        newProject.innerHTML = "\n            <label for=\"project-name\">Project Name:</label>\n            <input type=\"text\" class=\"project-name\" required><br>\n            \n            <label for=\"project-description\">Description:</label>\n            <input type=\"text\" class=\"project-description\" required><br>\n        ";
        projectsFields.appendChild(newProject);
    }
    function toggleSection(sectionId) {
        var section = document.getElementById(sectionId);
        if (section) {
            section.classList.toggle('hidden');
        }
    }
    function shuffleSkills() {
        var _a;
        var skillsInput = document.getElementById('skills');
        var skills = skillsInput.value.split(',').map(function (skill) { return skill.trim(); }).filter(function (skill) { return skill; });
        for (var i = skills.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [skills[j], skills[i]], skills[i] = _a[0], skills[j] = _a[1];
        }
        skillsInput.value = skills.join(', ');
    }
});

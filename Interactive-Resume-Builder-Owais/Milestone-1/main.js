// ts/script.ts
document.addEventListener('DOMContentLoaded', function () {
    var skills = document.querySelectorAll('.skill');
    var shuffleButton = document.getElementById('shuffle-skills');
    var toggleButtons = document.querySelectorAll('.toggle-section');
    var themeSwitcher = document.getElementById('theme-switcher');
    // Shuffle Skills
    if (shuffleButton) {
        shuffleButton.addEventListener('click', function () {
            shuffleSkills();
        });
    }
    // Toggle Sections (Education, Projects, Work Experience)
    toggleButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var sectionId = button.getAttribute('data-section');
            var section = document.getElementById(sectionId);
            if (section) {
                section.classList.toggle('hidden');
                button.textContent = section.classList.contains('hidden') ? "Show ".concat(sectionId) : "Hide ".concat(sectionId);
            }
        });
    });
    // Theme Switcher
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', function () {
            document.body.classList.toggle('dark-theme');
        });
    }
    // Function to shuffle skills without using Array.from()
    function shuffleSkills() {
        // Convert NodeList to an array using a loop
        var skillsArray = [];
        for (var i = 0; i < skills.length; i++) {
            skillsArray.push(skills[i]);
        }
        for (var i = skillsArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = skillsArray[i].innerHTML;
            skillsArray[i].innerHTML = skillsArray[j].innerHTML;
            skillsArray[j].innerHTML = temp;
        }
    }
});

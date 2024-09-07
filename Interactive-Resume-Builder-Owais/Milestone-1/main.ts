document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelectorAll('.skill');
    const shuffleButton = document.getElementById('shuffle-skills');
    const toggleButtons = document.querySelectorAll('.toggle-section');
    const themeSwitcher = document.getElementById('theme-switcher');

    if (shuffleButton) {
        shuffleButton.addEventListener('click', () => {
            shuffleSkills();
        });
    }

    toggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            const section = document.getElementById(sectionId!);

            if (section) {
                section.classList.toggle('hidden');
                button.textContent = section.classList.contains('hidden') ? `Show ${sectionId}` : `Hide ${sectionId}`;
            }
        });
    });

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
        });
    }
    function shuffleSkills() {
        const skillsArray: HTMLElement[] = [];
        for (let i = 0; i < skills.length; i++) {
            skillsArray.push(skills[i] as HTMLElement);
        }

        for (let i = skillsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = skillsArray[i].innerHTML;
            skillsArray[i].innerHTML = skillsArray[j].innerHTML;
            skillsArray[j].innerHTML = temp;
        }
    }
});

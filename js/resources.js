// Resource data
const resources = [
    { id: 1, title: "Mathematics Teacher's Guide - Primary", description: "Complete guide for teaching primary mathematics with lesson plans, activities, and assessment tools.", type: "teacher-book", subject: "mathematics", level: "primary", grade: "1-3", tsNumber: "TS#MAT101", icon: "fas fa-calculator" },
    { id: 2, title: "Science Learner's Book - Secondary", description: "Comprehensive science textbook for secondary students with interactive exercises and experiments.", type: "learner-book", subject: "science", level: "secondary", grade: "10-12", tsNumber: "TS#SCI202", icon: "fas fa-flask" },
    { id: 3, title: "STEM Teaching Charts", description: "Visual aids and charts for teaching STEM concepts in both primary and secondary classrooms.", type: "chart", subject: "stem", level: "both", grade: "all", tsNumber: "TS#STEM305", icon: "fas fa-robot" },
    { id: 4, title: "Literacy Lesson Plans", description: "Structured lesson plans for teaching literacy in primary schools with reading and writing activities.", type: "lesson-plan", subject: "literacy", level: "primary", grade: "4-6", tsNumber: "TS#LIT404", icon: "fas fa-book-open" },
    { id: 5, title: "Social Studies Activity Sheets", description: "Interactive activity sheets for teaching social studies concepts through engaging exercises.", type: "activity", subject: "social-studies", level: "primary", grade: "4-6", tsNumber: "TS#SOC505", icon: "fas fa-globe-americas" },
    { id: 6, title: "Language Assessment Tools", description: "Comprehensive assessment tools for evaluating language proficiency across all grade levels.", type: "assessment", subject: "languages", level: "both", grade: "all", tsNumber: "TS#LANG606", icon: "fas fa-language" },
    { id: 7, title: "Mathematics Worksheets - Form 1-4", description: "Practice worksheets covering algebra, geometry, and statistics for middle school students.", type: "activity", subject: "mathematics", level: "secondary", grade: "7-9", tsNumber: "TS#MAT707", icon: "fas fa-shapes" },
    { id: 8, title: "Science Experiments Guide", description: "Step-by-step guide to conducting science experiments with minimal equipment.", type: "teacher-book", subject: "science", level: "both", grade: "all", tsNumber: "TS#SCI808", icon: "fas fa-vial" },
    { id: 9, title: "Digital Literacy Curriculum", description: "Complete curriculum for teaching digital literacy skills in the modern classroom.", type: "lesson-plan", subject: "stem", level: "secondary", grade: "10-12", tsNumber: "TS#DIG909", icon: "fas fa-laptop-code" }
];


// Render resources — *NO INLINE EVENTS*
function renderResources(filteredResources) {
    const resourceGrid = document.getElementById('resource-grid');
    const resourceCount = document.getElementById('resource-count');

    if (!resourceGrid) return;
    resourceGrid.innerHTML = '';
    if (resourceCount) resourceCount.textContent = filteredResources.length;

    filteredResources.forEach(resource => {
        let iconColor = 'var(--primary)';
        if (resource.type === 'teacher-book') iconColor = 'var(--success)';
        if (resource.type === 'learner-book') iconColor = 'var(--warning)';
        if (resource.type === 'lesson-plan') iconColor = 'var(--accent)';

        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute("data-id", resource.id);

        card.innerHTML = `
            <div class="card-icon" style="background-color:${iconColor}20;color:${iconColor};">
                <i class="${resource.icon}"></i>
            </div>
            <div class="card-content">
                <h3>${resource.title}</h3>
                <p>${resource.description}</p>
                <div class="ts-number">${resource.tsNumber}</div>
                <div class="resource-meta">
                    <span><i class="fas fa-graduation-cap"></i> ${resource.level === 'both' ? 'Primary & Secondary' : resource.level}</span>
                    <span><i class="fas fa-chalkboard"></i> ${resource.subject}</span>
                </div>
                <div class="resource-actions">
                    <button class="btn btn-primary view-resource" data-id="${resource.id}">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-outline download-resource" data-id="${resource.id}">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
        `;

        resourceGrid.appendChild(card);
    });
}


// Filtering (unchanged)
function filterResources() {
    const level = document.getElementById('education-level').value;
    const subject = document.getElementById('subject').value;
    const type = document.getElementById('resource-type').value;
    const grade = document.getElementById('grade').value;
    const search = document.getElementById('resource-search')?.value.toLowerCase() || '';

    return resources.filter(resource =>
        (level === 'all' || resource.level === level || resource.level === 'both') &&
        (subject === 'all' || resource.subject === subject) &&
        (type === 'all' || resource.type === type) &&
        (grade === 'all' || resource.grade === grade || resource.grade === "all") &&
        (!search || `${resource.title} ${resource.description} ${resource.tsNumber} ${resource.subject}`.toLowerCase().includes(search))
    );
}


// 🔥 Event Delegation (Secure Replacement for onclick="")
document.addEventListener('click', function (e) {
    const id = e.target.closest("[data-id]")?.dataset.id;
    if (!id) return;

    if (e.target.closest(".view-resource")) return viewResource(+id);
    if (e.target.closest(".download-resource")) return download-resource" data-id="+id);
});


// Actions
function viewResource(id) {
    const r = resources.find(x => x.id === id);
    alert(`Viewing Resource → ${r.title}\nTS: ${r.tsNumber}`);
}

function download-resource" data-id="id) {
    const r = resources.find(x => x.id === id);
    alert(`Downloading → ${r.title}\nTS: ${r.tsNumber}`);
}


// Init
document.addEventListener("DOMContentLoaded", () => {
    renderResources(resources);
    setupFilters();
});

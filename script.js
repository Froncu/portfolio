let projects = [];

// Fetch and render projects
async function loadProjects() {
   try {
      const response = await fetch('projects.json');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      projects = await response.json();
      renderProjects();
   } catch (error) {
      console.error('Failed to load projects.json:', error);
   }
}

// Render projects grid
function renderProjects() {
   const grid = document.getElementById('projectsGrid');
   grid.innerHTML = ''; // clear existing

   projects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.onclick = () => openModal(index);

      const img = document.createElement('img');
      img.src = project.thumbnail;
      img.alt = project.title;

      const overlay = document.createElement('div');
      overlay.className = 'project-card-overlay';

      const title = document.createElement('h3');
      title.className = 'project-card-title';
      title.textContent = project.title;

      overlay.appendChild(title);
      card.appendChild(img);
      card.appendChild(overlay);
      grid.appendChild(card);
   });
}

// Open modal with project details
function openModal(index) {
   const project = projects[index];
   const modal = document.getElementById('projectModal');

   document.getElementById('modalImage').src = project.thumbnail;
   document.getElementById('modalImage').alt = project.title;
   document.getElementById('modalTitle').textContent = project.title;
   document.getElementById('description').textContent = project.description;

   const tagsContainer = document.getElementById('modalTags');
   tagsContainer.innerHTML = '';
   project.tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.className = 'modal-tag';
      tagElement.textContent = tag;
      tagsContainer.appendChild(tagElement);
   });

   const link = document.getElementById('modalLink');

   if (project.link) {
      link.href = project.link;
      link.style.display = 'flex';
   } else {
      link.style.display = 'none';
   }

   modal.classList.add('active');
   document.body.style.overflow = 'hidden';

   setTimeout(() => modal.classList.add('visible'), 10);
}

// Close modal
function closeModal() {
   const modal = document.getElementById('projectModal');
   modal.classList.remove('visible');

   setTimeout(() => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
   }, 300);
}

// Event listeners
document.getElementById('modalClose').onclick = closeModal;
document.getElementById('projectModal').onclick = e => {
   if (e.target.id === 'projectModal') closeModal();
};
document.addEventListener('keydown', e => {
   if (e.key === 'Escape') closeModal();
});

// Initialize
loadProjects();

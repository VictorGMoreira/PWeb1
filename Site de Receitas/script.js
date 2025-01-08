// Função para exibir a seção correspondente
function showSection(sectionId) {
    // Esconde todas as seções
    var sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        section.classList.remove('active');
    });

    // Exibe a seção escolhida
    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}

// Exibir a seção "home" por padrão quando a página carregar
document.addEventListener("DOMContentLoaded", function() {
    showSection('home');
});

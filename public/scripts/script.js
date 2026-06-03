document.getElementById('loadPostsBtn').addEventListener('click', loadPosts);

function loadPosts() {
 fetch('/api/itens')
 .then(response => response.json())
 .then(posts => {
     let output = '';
     
     posts.forEach(post => {
         output += `
            <div class="card">
                <h3>${post.nome}</h3>
                <p><strong>Categoria:</strong> ${post.categoria}</p>
                <p>${post.descricao}</p>
                <p style="color: #e74c3c; font-weight: bold;">${post.preco_nota}</p>
                <button class="btn-excluir" onclick="excluirItem(${post.id})">Excluir</button>
            </div>
         `;
     });
     
     document.getElementById('postList').innerHTML = output;
 })
 .catch(error => {
     console.error('Erro:', error);
 });
}

function excluirItem(id) {
    if (confirm("Deseja realmente excluir este item?")) {
        fetch(`/api/itens/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            loadPosts(); 
        })
        .catch(error => console.error('Erro ao deletar:', error));
    }
}
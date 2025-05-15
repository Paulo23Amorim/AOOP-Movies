const BASE_URL = "https://aoop-movies.onrender.com/api/movies";

export async function fetchMovie(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar o filme");
  return res.json();
}

export async function addComment(movieId, text) {
  const res = await fetch(`${BASE_URL}/${movieId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error("Erro ao adicionar comentário");
  return res.json();
}

export async function deleteComment(movieId, commentId) {
  const res = await fetch(`${BASE_URL}/${movieId}/comments/${commentId}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Erro ao apagar comentário");
}

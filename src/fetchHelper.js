export const fetchPosts = () => {
  // pre fetching for the posts page
  const storedJson = sessionStorage.getItem('postsList')

  if (!storedJson) {
    fetch('https://muraro.xyz/wp/wp-json/wp/v2/posts?per_page=100')
      .then(response => {
        return response.json()
      })
      .then(posts => {
        sessionStorage.setItem('postsList', JSON.stringify(posts))
      })
  }
}

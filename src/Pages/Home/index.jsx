import { useEffect, useState, useCallback } from 'react';

import './styles.css';

import { loadPosts } from '../../components/utils/load-posts';
import { Posts } from '../../components/Posts'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';


export const Home = () => {
  /*state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  }*/

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');


  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ? allPosts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase())) : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos)
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postsPerPage)
  }, [handleLoadPosts, postsPerPage])

  const loadMorePosts = () => {

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts)

    setPosts(posts);
    setPage(nextPage);
  }

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  }


  return (
    <section className='container'>
      {!!searchValue && (
        <h1>Search value: {searchValue}</h1>

      )}
      <TextInput
        searchValue={searchValue}
        onChange={handleSearch}
      />
      {filteredPosts.length > 0 && (
        <Posts
          posts={filteredPosts}
        />
      )}

      {filteredPosts.length === 0 && (
        <p>Não existem Posts para essa pesquisa!</p>
      )}
      <div className='button-container'>
        {!searchValue && (
          <Button
            disabled={noMorePosts}
            text='Load More Posts'
            onClick={loadMorePosts}
          />
        )}
      </div>
    </section>
  )
}

export default Home;

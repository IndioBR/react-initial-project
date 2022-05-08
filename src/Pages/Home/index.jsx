import { Component } from 'react';

import './styles.css';

import { loadPosts } from '../../components/utils/load-posts';
import { Posts } from '../../components/Posts'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
  }

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage })
  }

  handleSearch = (e) => {
    const { value } = e.target;
    this.setState({ ...this.state, searchValue: value })
  }


  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? allPosts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase())) : posts;


    return (
      <section className='container'>
        {!!searchValue && (
          <h1>Search value: {searchValue}</h1>

        )}
        <TextInput
          searchValue={searchValue}
          onChange={this.handleSearch}
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
              onClick={this.loadMorePosts}
            />
          )}

        </div>
      </section>
    );
  }
}

export default Home;

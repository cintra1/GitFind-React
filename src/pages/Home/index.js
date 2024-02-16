import { useState } from 'react';
import { Header } from '../../components/Header';
import background2 from '../../assets/background-2.png';
import ItemList from '../../components/ItemList';

import './styles.css';


function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleClean = () => {
    setUser('');
    setCurrentUser(null);
    setRepos(null);
  }

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    
    if(newUser.name){
      const {avatar_url, name, bio, login, html_url} = newUser;
      setCurrentUser({avatar_url, name, bio, login, html_url});
    

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
        setRepos(newRepos);
      }
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleGetData(); // Chame diretamente handleGetData()
    }
  }

  return (
    <div className="App">
      <Header />
      <div className='conteudo'>
        <img src={background2} alt='background' className='background'/>
        <div className='info'>
          <div>
            <input name='usuario' value={user} onChange={e => setUser(e.target.value)}
             placeholder='@username'  onKeyPress={handleKeyPress}/>
            <button onClick={handleGetData}>Buscar</button>
            <button onClick={handleClean} className='ex'>X</button>
          </div>
          {currentUser?.name ? (
            <>
              <div className='perfil'>
              <a href={currentUser.html_url} className='link-repo'><img src={currentUser.avatar_url} 
              className='profile' alt='imag'/></a>
              <div>
              <a href={currentUser.html_url} className='link-repo'><h3>{currentUser.name}</h3></a>
              <a href={currentUser.html_url} className='link-repo'><spam>@{currentUser.login}</spam></a>
                <p>{currentUser.bio}</p>
              </div>
              </div>
              <hr />
            </>
          ) : null}

          {repos?.length ? (
          <div>
            <a className='link-repo' href={`https://github.com/${currentUser.login}?tab=repositories`}><h4 className='repositorio'>Repositórios</h4></a>
            {repos.map(repo =>  <a href={repo.html_url} className='link-repo'><ItemList title={repo.name} description={repo.description} /></a>)}
          </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;

import './App.css'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies'
// import { useState, useCallback, useRef, useEffect } from "react";

function App () {
  const { movies: mappedMovies } = useMovies()

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form'>
          <input
            style={{
              border: '1px solid transparent'
              /* borderColor: error ? 'red' : 'transparent' */
            }} name='query' placeholder='Avengers, Star Wars, The Matrix...'
          />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={mappedMovies} />
      </main>
    </div>
  )
}

export default App

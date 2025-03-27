import { useState, useEffect, useCallback } from 'react'

import './App.css'


function App() {

  const [search, setSearch] = useState('')

  const [products, setProducts] = useState([])
  //console.log(products);

  const debounce = (callback, delay) => {
    let timeout;
    return (value) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        callback(value)
      }, delay)
    }
  }


  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const fetchProducts = async (search) => {
    if (!search.trim()) {
      setProducts([])
      return
    }
    try {
      const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${search}`)
      const data = await response.json()
      setProducts(data)
      console.log('Typing...');



    } catch (err) {
      error => console.error(error)
    }


  }


  const debouncedProducts = useCallback(
    debounce(fetchProducts, 500)
    , [])

  useEffect(() => {

    debouncedProducts(search)

  }, [search])





  return (
    <>
      <h1>Autocomplete Ex</h1>
      <div className='container'>
        <input
          type='text'
          placeholder='Search...'
          value={search}
          onChange={handleSearchChange}
        />
        <div className='dropdown'>
          {products.length > 0 && (


            products.map(p => (

              <p key={p.id}>{p.name}</p>


            ))


          )}
        </div>
      </div>

    </>
  )
}

export default App

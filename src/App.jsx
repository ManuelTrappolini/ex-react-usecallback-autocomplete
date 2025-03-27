import { useState, useEffect } from 'react'

import './App.css'


function App() {

  const [search, setSearch] = useState('')

  const [products, setProducts] = useState([])
  console.log(products);


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


    } catch (err) {
      error => console.error(error)
    }


  }


  useEffect(() => {

    fetchProducts(search)

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

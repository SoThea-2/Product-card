import { useEffect, useState } from "react"

const app = () => {
  const [product,setProduct] = useState([])
  const [isOpen,setIsOpen] = useState(false)
  const [selectProduct,setSelectProduct] = useState(null)
  const [search,setSearch] = useState("")
  useEffect(()=>{
    const fetchProduct = async()=>{
      const res = await fetch('https://fakestoreapi.com/products')
      const data = await res.json()
      setProduct(data)
    }
    fetchProduct()
  },[])
  const openModal = (product) =>{
    setIsOpen(true)
    setSelectProduct(product)
  }
  const closeModal = ()=>{
    setIsOpen(false)
    setSelectProduct(null)
  }

  const filterProduct = product.filter((p)=>p.title.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <h1 className="flex justify-center items-center text-red-500 font-semibold text-3xl p-20 font-bold">Product List</h1>
      <div className="flex justify-center ">
        <input type="text" placeholder="Search Product..." onChange={(e)=>setSearch(e.target.value)} className="p-2 border-2 border-amber-400"/>
      </div>
      <div className="grid grid-cols-4 w-full gap-3 p-20">
        {
          filterProduct.map((p)=>(
            <div onClick={()=>openModal(p)} key={p.id} className="w-full h-96 rounded-md shadow-md bg-gray-300 border-1 border-yellow-400 hover:bg-gray-500 hover:scale-105 transition-all duration-300 p-2">
              <img src={p.image} alt="" className="w-full h-68 object-contain p-3"/>
              <h1>{p.title}</h1>
              <p>${p.price}</p>
            </div>
          ))  
        }
      </div>

      {
        isOpen &&(
          <div>
            <div>
              <div>
                <button>X</button>
                <div>
                  <img src="" alt="" />
                </div>
                <div>
                  <h1></h1>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
    
  )
}

export default app

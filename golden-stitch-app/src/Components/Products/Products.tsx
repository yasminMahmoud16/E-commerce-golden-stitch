
import { useContext } from 'react';
import ProductsCard from '../ProductsCard/ProductsCard';
import { ProductContext } from '../../Context/ProductContext';
// import {  Oval } from 'react-loader-spinner';

export default function Products() {

    
    const { allProductsData,isLoading}=useContext(ProductContext)
    
    return <>
        <h1 className='text-center text-[#16C216] text-3xl font-bold mt-8 capitalize'>all products </h1>

        <section className='min-h-screen'>
{isLoading ? <div className='  h-screen flex items-center justify-center'>
                {/* <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
            /> */}
        </div>
            :<div className="container">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">


                    {allProductsData?.map((pro) => (
                        <ProductsCard products={pro} key={pro._id} />
                    ))}
            
            </div>
        </div>}
 
        </section>
    </>
}





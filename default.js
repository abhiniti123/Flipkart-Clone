import {products} from './constants/data.js'
import Products from './model/productSchema.js'

const DefaultData = async() => {
    try{
       await Products.insertMany(products);
       console.log("Data imported Successfully")
    } catch (error){
        console.log("Error while fetching default data", error.message)
    }
}

export default DefaultData;
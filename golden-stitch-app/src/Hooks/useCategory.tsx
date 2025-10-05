import axios from 'axios';
import { useQuery } from "@tanstack/react-query";

export default function useCategory() {
    const getCategories = async () => {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    };
    const { data: catData, isLoading:catLoading } = useQuery({
        queryKey: 'categories',
        queryFn: getCategories,
        refetchOnWindowFocus: false,
    });

    const categoriesData = catData?.data.data;
    console.log(categoriesData);
    


    return { categoriesData, catLoading };
}

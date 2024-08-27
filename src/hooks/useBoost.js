import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
const fetchPopularBoost= () => {
    return api.get(`/boards/B`)
}

export const useBoostQuery = () => {
    return useQuery({
        queryKey:['boost-popular'],
        queryFn: fetchPopularBoost,
        select: (result) => result.data
    })
}
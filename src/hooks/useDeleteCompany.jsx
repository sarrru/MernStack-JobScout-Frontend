
import axios from "axios";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "@/utils/constant";

const useDeleteCompany = () => {
    const dispatch = useDispatch();

    const deleteCompany = async (companyId) => {
        try {
            const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
                withCredentials: true
            });

            if (res.data.success) {
                // Fetch the updated list of companies after deletion
                const updatedCompanies = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    withCredentials: true
                });

                if (updatedCompanies.data.success) {
                    dispatch(setAllCompanies(updatedCompanies.data.companies));
                }
            }
        } catch (error) {
            console.error("Error deleting company:", error);
        }
    };

    return deleteCompany;
};

export default useDeleteCompany;

import authApi from "../AxiosConfig.jsx";

// Fetch the list of all coupons (vouchers)
export const getListVoucher = async () => {
    try {
        const response = await authApi.get('/coupons');
        return response.data;
    } catch (error) {
        console.error('Error fetching voucher list:', error);
        throw error;
    }
};

// Create a new coupon (voucher)
export const addVoucher = async (voucherData, token) => {
    try {
        const response = await authApi.post('/coupons', voucherData, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token for authentication
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding voucher:', error);
        throw error;
    }
};

// Get a specific coupon by ID
export const getVoucherById = async (id) => {
    try {
        const response = await authApi.get(`/coupons/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching voucher with ID ${id}:`, error);
        throw error;
    }
};

// Edit an existing voucher
export const editVoucher = async (id, voucherData, token) => {
    try {
        const response = await authApi.patch(`/coupons/${id}`, voucherData, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token for authentication
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error editing voucher:', error);
        throw error;
    }
};

// Delete a coupon (voucher)
export const deleteVoucher = async (id, token) => {
    try {
        const response = await authApi.delete(`/coupons/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token for authentication
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting voucher:', error);
        throw error;
    }
};
import authApi from "../AxiosConfig.jsx";

export const getListVoucher = async () => {
  try {
    const response = await authApi.get('/coupons');
    return response.data;
  } catch (error) {
    console.error('Error fetching voucher list:', error);
    throw error;
  }
};

export const addVoucher = async (voucherData, token) => {
  try {
    const response = await authApi.post('/coupons', voucherData, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token để xác thực
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding voucher:', error);
    throw error;
  }
};

export const editVoucher = async (id, updatedData, token) => {
  try {
    const response = await authApi.patch(`/coupons/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token để xác thực
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error editing voucher:', error);
    throw error;
  }
};
export const deleteVoucher = async (id, token) => {
  try {
    const response = await authApi.delete(`/coupons/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token để xác thực
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting voucher:', error);
    throw error;
  }
};


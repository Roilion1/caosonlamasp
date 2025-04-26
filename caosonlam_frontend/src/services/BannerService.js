import httpAxios from "./httpAxios"

const BannerService ={
    index: async ()=>{
        return await httpAxios.get(`banner`);
    },
    trash: async ()=>{
        return await httpAxios.get(`banner/trash`);
    },
    show: async (id)=>{
        return await httpAxios.get(`banner/show/${id}`);
    },
    insert: async (data)=>{
        return await httpAxios.post(`banner/insert`,data);
    },
    update: async (data,id)=>{
        return await httpAxios.post(`banner/update/${id}`, data);
    },
    status: async (id)=>{
        return await httpAxios.get(`banner/status/${id}`);
    },
    delete: async (id)=>{
        return await httpAxios.get(`banner/delete/${id}`);
    },
    restore: async (id)=>{
        return await httpAxios.get(`banner/restore/${id}`);
    },
    destroy: async (id)=>{
        return await httpAxios.delete(`banner/destroy/${id}`);
    },
    add: async (banner) => {
        console.log('Data to be sent:', banner);
        const response = await httpAxios.post('banner/store', banner);
        console.log('Response from API:', response);
        return response.data;
    },
}

export default BannerService;
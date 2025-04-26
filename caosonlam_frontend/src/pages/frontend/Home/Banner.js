import React, { useEffect, useState } from "react";
import BannerService from "../../../services/BannerService"; // Điều chỉnh đường dẫn

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                // Gọi API để lấy dữ liệu banner
                const result = await BannerService.index();
                // Giả sử result.banners chứa thông tin banner
                const activeBanners = result.banners
                    .filter((banner) => banner.status === 1) // Lọc banner có trạng thái active (status = 1)
                    .sort((a, b) => a.sort_order - b.sort_order); // Sắp xếp theo sort_order
                setBannerData(activeBanners || []);
            } catch (error) {
                console.error("Error fetching banner data:", error);
            }
        };
        fetchBannerData();
    }, []);

    useEffect(() => {
        // Tự động chuyển đổi banner sau mỗi 3 giây
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [bannerData.length]);

    if (!bannerData.length) {
        return <div>Đang tải...</div>; // Hiển thị thông báo nếu không có banner
    }

    return (
        <div className="bg-gray-100 py-12">
            <div className="lg:max-w-[1280px] md:max-w-[696px] max-w-[343px] mx-auto bg-white lg:px-20 md:px-6">
                <div className="flex justify-between items-center">
                    <div className="flex justify-center items-center py-4">
                        <img
                            src={`http://127.0.0.1:8000/images/banners/${bannerData[currentIndex].image}`} // Sử dụng URL ảnh từ API
                            alt="Banner"
                            className="max-w-[400px] mx-4"
                        />
                        <div className="bg-gray-800 py-4 px-3 flex flex-col items-center">
                            <p className="lg:text-4xl md:text-2xl text-2xl font-semibold text-center text-white">
                                {bannerData[currentIndex].title} {/* Hiển thị tiêu đề banner */}
                            </p>
                            <p className="text-lg text-white text-center">
                                {bannerData[currentIndex].description} {/* Hiển thị mô tả banner */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;

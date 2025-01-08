import { Navigation, Pagination, Autoplay, Grid } from 'swiper/modules';

export class Swiper {
    public initSwiperOptions() {
        return {
            modules: [Autoplay, Grid, Navigation, Pagination],
            slidesPerView: 1.2,
            spaceBetween: 24,
            centerSlides: true,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true
            },
            navigation: {
                nextEl: '.custom_swiper-navigation--prev',
                prevEl: '.custom_swiper-navigation--next'
            },
            pagination: {
                el: '.custom_swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                768: {
                    slidesPerView: 1.3
                }
            }
        };
    }

    public initDevSwiperOptions() {
        return {
            modules: [Autoplay, Grid],
            slidesPerView: 1.2,
            spaceBetween: 24,
            centerSlides: true,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true
            },
            breakpoints: {
                768: {
                    slidesPerView: 1.3
                }
            }
        };
    }
}

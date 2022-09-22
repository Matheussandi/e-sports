import { ReactNode } from 'react';

import { Swiper, SwiperProps } from 'swiper/react';
import { A11y, Navigation } from 'swiper';

import 'swiper/css/navigation';
import 'swiper/css';

interface SliderProps {
    settings: SwiperProps;
    children: ReactNode;
}

export function Slider({ settings, children }: SliderProps) {
    return (
        <>
            <Swiper
                {...settings}
                modules={[Navigation, A11y]}
            >
                {children}
            </Swiper>
        </>
    )
}
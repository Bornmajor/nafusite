import React from 'react';
import Catalogue from './Catalogue';
import TestimonialCard from './TestimonialCard';
import avatar_1 from '../assets/images/avatar_1.webp'
import avatar_2 from '../assets/images/avatar_2.jpg'
import avatar_3 from '../assets/images/avatar_3.jpg'
import avatar_4 from '../assets/images/avatar_4.jpg'
import avatar_5 from '../assets/images/avatar_5.webp'



const TestimonialSection = () => {
    return (
        <div className='testimonial-section'>

            <Catalogue title="OUR CLIENTS">

            <TestimonialCard
            username="Sarah J"
            imgUrl={avatar_1}
            desc="I was hesitant to buy jewelry online, but I'm so glad I found Nafusite The pieces are stunning and the quality is even better in person."
            />

             <TestimonialCard
            username="Mary T"
            imgUrl={avatar_2}
            desc="I received my necklace as a gift and I absolutely love it! It's so elegant and unique. The customer service was also fantastic."
            />


            <TestimonialCard
            username="Michael T"
            imgUrl={avatar_3}
            desc="I was looking for a special ring for my fiancee and I found the perfect one on Nafusite. The selection is amazing and the prices are very reasonable."
            />

           <TestimonialCard
            username="Christopher R"
            imgUrl={avatar_4}
            desc="I'm a big fan of Nafusite I've bought several pieces from them and I've never been disappointed. The quality is excellent and the designs are always on trend."
            />


           <TestimonialCard
            username="Osborn M"
            imgUrl={avatar_4}
            desc="I was looking for a specific type of earrings and I couldn't find them anywhere else. I found them on Nafusite and they were exactly what I wanted."
            />


            </Catalogue>

           
            
        </div>
    );
}

export default TestimonialSection;

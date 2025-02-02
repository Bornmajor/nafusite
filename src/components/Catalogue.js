import React, { useRef,useState,useEffect } from 'react';
import { MdArrowBackIos,MdArrowForwardIos } from "react-icons/md";


const Catalogue = ({children,title}) => {
  
    
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
        }
      };
    
      const scrollRight = () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
        }
      };

        // Function to check if scrolling is needed
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();

    // Listen for scrolling and window resize
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

      
    return (
        <div className='catalogue'>

            <div className='d-flex justify-content-between' style={{paddingLeft:'30px'}}>
              <p className='section-header'>{title}</p>  

              
                 <div className='group-scroll-btns'>
                {canScrollLeft && (
                <span className='scroll-btn left' onClick={() => scrollLeft()}><MdArrowBackIos /></span>
                )}
                {canScrollRight && (
                    <span className='scroll-btn right' onClick={() => scrollRight()} ><MdArrowForwardIos /></span>
                )}
                

              </div>
             
             
            </div>
        
        <div className='horizontal-scrollable' ref={scrollContainerRef}>
        
            {children}
            
        </div>
        </div>
        
    );
}

export default Catalogue;

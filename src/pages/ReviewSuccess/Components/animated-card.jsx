import { useEffect,useState,useRef } from "react";
import { cardVariant } from "../review-success";
import { motion, useScroll,useTransform,useAnimation,useInView} from "framer-motion";
import SimpleProductCardReview from "../../../components/SimpleProductCardReview/simple-review-product-card";

export default function AnimatedCard({product ,Container}){
    const [cardMounted , setCardMounted] = useState(false);
    const cardRef = useRef();
    let cardAnimate = useAnimation();
    let cardIsInView = useInView(cardRef, {once:true, margin:"0px 0px -40% 0px"});

    const {scrollYProgress:cardScrollYProgress} = useScroll({
        target:cardRef,
        offset:['start start','end start']
    })

    let cardY = useTransform(cardScrollYProgress,[0,1],["0%", "-50%"]);
    let cardOpacity = useTransform(cardScrollYProgress,[0,1],["100%", "0%"]);

    useEffect(()=>{
        if (cardIsInView){
            let totalInitialAnimationDuration=.3 * 1000;
            cardAnimate.start('animate');

            setTimeout(() => {
                setCardMounted(true);
            }, totalInitialAnimationDuration);
        }
    } ,[cardIsInView,cardOpacity,cardAnimate])

    return (
        <Container ref={cardRef} as={motion.div} variants={cardVariant} initial="initial" animate={cardAnimate} style={cardMounted ? {opacity:cardOpacity,y:cardY} :{}}>
            <SimpleProductCardReview product={product} name_first={true}/>
        </Container>
    )
}

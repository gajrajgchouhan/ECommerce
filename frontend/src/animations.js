import { motion } from "framer-motion";
const PageAnim = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1 },
};

export const PageWrapper = ({ children }) => {
    return (
        <motion.div
            variants={PageAnim}
            initial="initial"
            animate="animate"
            transition="transition"
        >
            {children}
        </motion.div>
    );
};

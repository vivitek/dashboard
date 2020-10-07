import { motion } from "framer-motion"
import React from "react"

const MotionDiv = ({isAnimated, children, ...props}) => {
    if (isAnimated) {
        return (
            <motion.div {...props}>
                {children}
            </motion.div>
        )
    }
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default MotionDiv
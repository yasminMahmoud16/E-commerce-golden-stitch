import type { LayoutMotionProps } from '@/Utilities/types'
import { motion } from "framer-motion"

export default function LayoutMotion({children}:LayoutMotionProps) {
    return <>
         <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}>


                    {children}
                </motion.div>
    </>
}

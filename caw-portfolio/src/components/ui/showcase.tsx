// "use client";
// import { useFrame } from "@react-three/fiber";
// import { m, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
// import { useRef, useState } from "react"
// import Background from "./background";

// // Mock fonts or use standard fonts
// const fontClassName = "font-sans";


// export default function Showcase() {
//     const targetRef = useRef(null);
//     const { scrollYProgress } = useScroll({
//         target: targetRef,
//     });
//     const springedScroll = useSpring(scrollYProgress, { damping: 7 })
//     const overlySpringedScroll = useSpring(scrollYProgress, { damping: 5 })
//     const x = useTransform(springedScroll, [-0.1, 0, 1, 1.2], ['-2%', "0%", "70%", '75%']);
//     const y = useTransform(overlySpringedScroll, [-0.2, 1.2], ["-4%", "24%"]);


//     useMotionValueEvent(springedScroll, "change", (latest: any) => {
//         console.log("Page scroll: ", latest)
//     })
//     useMotionValueEvent(overlySpringedScroll, "change", () => {
//         // console.log(latest)
//     })



//     const [selectedProject, setSelectedProject] = useState<number>();
//     const [hoveredProject, setHoveredProject] = useState<number>();


//     const projects = [
//         { id: 1, name: 'One', description: "A cutting-edge web application built with NextJs and ThreeJs, pushing the boundaries of interactive storytelling." },
//         { id: 2, name: 'Two', description: "A robust enterprise solution leveraging Java, Spring, and MySQL for a scalable and secure backend infrastructure." },
//         { id: 3, name: 'Three', description: "A data-driven platform utilizing PostgreSQL and Supabase for real-time analytics and insights." },
//         { id: 4, name: 'Four', description: "A mobile-first application developed with ReactNative, Java, and Spring, offering a seamless user experience across devices." }
//     ];

//     const techStack = [
//         { name: 'NextJs', projects: [1, 4] },
//         { name: 'React', projects: [1, 4] },
//         { name: 'ThreeJs', projects: [1] },
//         { name: 'Java', projects: [2, 4] },
//         { name: 'Spring', projects: [2, 4] },
//         { name: 'MySQL', projects: [2, 4] },
//         { name: 'PostgreSQL', projects: [3] },
//         { name: 'Supabase', projects: [3] },
//         { name: 'ReactNative', projects: [2, 4] },
//         { name: 'GIT', projects: [1, 2, 3, 4] }
//     ]


//     return (
//         <div className="w-full h-full">
//             {/* <div>
//             <span className="text-9xl">
//                 Hello
//             </span>
//             <Link href={'/visual-showcase'}>
//                 <Button>
//                 Visual Showcase!
//                 </Button>
//             </Link>
//         </div> */}
//             <div ref={targetRef} className="w-full h-[300vh] bg-transparent  relative" >
//                 <Background />

//                 {/* <motion.div
//             className="fixed top-0 left-0 right-0 h-[10px] bg-red-500 z-50"
//             style={{ scaleX: scrollYProgress }}
//             /> */}
//                 <motion.div className={`${fontClassName} w-[300vw]  flex justify-between fixed top-0 right-0 items-start  z-50 mt-12 pl-32 text-start`}
//                     style={{ x, y }}
//                 >
//                     <span className="text-9xl z-50 w-[100vw] text-secondary-foreground font-thin">Reach</span>
//                     {/* <span className="text-9xl z-50 w-[100vw] font-thin">Backend</span>
//                 <span className="text-9xl z-50 w-[100vw] text-secondary-foreground font-thin">Mobile</span> */}
//                     <span className="text-9xl z-50 w-[100vw] text-secondary-foreground font-thin">Works,</span>
//                     <span className="text-9xl z-50 w-[100vw] text-secondary-foreground font-thin">Hello,</span>
//                 </motion.div>
//                 <div className="h-[100vh] w-full z-10">
//                     <div className="h-[100vh]  max-w-auto mx-32 border-2 border-black flex flex-col items-center justify-center">

//                     </div>
//                     {/* <div className="h-[100vh] max-w-auto mx-32 border-2 border-black">

//                 </div> */}
//                 </div>
//                 {/* <div className="h-[100vh] w-full bg-secondary "></div> */}
//                 <div className="h-[100vh] w-full z-10">
//                     {/* <div className="h-[100vh]  max-w-auto mx-32 border-2 border-black">

//                 </div> */}
//                     <div className="h-[100vh]  max-w-auto mx-32 ">
//                         <div className="w-full h-full flex flex-row justify-between" >
//                             <div className="w-1/2 h-full flex flex-col justify-start pt-24" >
//                                 <div className="flex justify-evenly items-center flex-1">
//                                     <div className=" flex flex-col justify-center items-start gap-y-4">
//                                         {projects.map((project, index) => {
//                                             return (
//                                                 <span key={index} className={`text-2xl  ${selectedProject ? (selectedProject != project.id ? 'text-secondary-foreground/50' : 'text-secondary-foreground') : 'text-secondary-foreground'}
//                                                 ${selectedProject == project.id ? 'shadow-2xl' : ''} font-semibold hover:text-secondary-foreground/80 hover:cursor-pointer transition-all`}
//                                                     onClick={() => {
//                                                         setHoveredProject(undefined)
//                                                         if (selectedProject == project.id) {
//                                                             setSelectedProject(undefined)
//                                                             return
//                                                         }
//                                                         setSelectedProject(project.id)
//                                                     }}
//                                                     onMouseEnter={() => setHoveredProject(project.id)}
//                                                     onMouseLeave={() => setHoveredProject(undefined)}
//                                                 >
//                                                     {project.name}
//                                                 </span>
//                                             )
//                                         })}
//                                     </div>
//                                     <div className="flex flex-col justify-center items-start gap-y-2">
//                                         {techStack.map((tech, index) => {
//                                             return (
//                                                 <span key={index} className={`transition-all
//                                             ${selectedProject ?
//                                                         (!tech.projects.includes(selectedProject) ? 'text-secondary-foreground/50' : 'text-secondary-foreground')
//                                                         :
//                                                         (hoveredProject ?
//                                                             (!tech.projects.includes(hoveredProject) ? 'text-secondary-foreground/50' : 'text-secondary-foreground') : 'text-secondary-foreground')}`} >
//                                                     {tech.name}
//                                                 </span>
//                                             )
//                                         })}

//                                     </div>
//                                 </div>
//                                 <div className="pb-12 w-full text-start">
//                                     {selectedProject &&
//                                         <span className="text-secondary-foreground font-light p-24">
//                                             {projects.filter((project) => project.id == selectedProject)[0].description}
//                                         </span>
//                                     }
//                                 </div>
//                             </div>
//                             {/* <AnimatePresence> */}
//                             <div className="flex-1 max-w-1/2 h-full flex items-center justify-center gap-1 p-8 ">
//                                 {projects.map((project, index) => {
//                                     return (

//                                         <motion.div
//                                             key={index}
//                                             className="shadow-2xl cursor-pointer"
//                                             // className={`${selectedProject == project.id ? 'flex-1' : 'w-4'} ${selectedProject == project.id ? 'h-72' : 'h-24 '}`}
//                                             onClick={() => { setSelectedProject(project.id) }}
//                                             animate={{
//                                                 flex: selectedProject == project.id ? 1 : 0,
//                                                 minWidth: selectedProject == project.id ? '30%' : '2rem',
//                                                 height: selectedProject == project.id ? '80%' : '24rem'
//                                             }}
//                                             transition={{ duration: 0.4 }}
//                                         >
//                                             <div className={`w-full h-full bg-cover rounded-lg`} style={{ backgroundImage: `url(${project.id}.jpg)` }} />
//                                         </motion.div>
//                                     )
//                                 })}
//                             </div>
//                             {/* </AnimatePresence> */}
//                         </div>
//                     </div>
//                 </div>
//                 {/* <div className="h-[100vh] w-full bg-primary "></div> */}
//                 <div className="h-[100vh] w-full z-10">
//                     <div className="h-[100vh]  max-w-auto mx-32 border-2 border-black">

//                     </div>
//                     {/* <div className="h-[100vh]  max-w-auto mx-32 border-2 border-black">

//                 </div> */}
//                 </div>
//             </div>
//         </div>
//     )
// }
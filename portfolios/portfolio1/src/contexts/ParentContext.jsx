import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const ParentContext = ({ children }) => {
    const [user, setUser] = useState(
        {
            fullName: "John Smith",
            phoneNumber: "+91",
            emailAddress: "johnsmith@mail.com",
            bio: "Adipisicing sit fugit ullam unde aliquid sequi Facilis soluta facilis perspiciatis corporis nulla aspernatur. Autem eligendi rerum delectus modi quisquam? Illo ut quasi nemo ipsa cumque perspiciatis! Maiores minima consectetur.",
            socialLinks: {
                website: "",
                facebook: "",
                twitter:"",
                instagram:"",
                linkedin:"",
                github:"",
                behance:"",
                dribbble:"",
            },
            education: {
                degree: "",
                fieldOfStudy: "",
                institution: "",
                graduationYear: "",
            },
            workExperience: [
                {
                    jobTitle: "",
                    organization: "",
                    duration: "",
                    description: "",
                },
            ],
            achievements: [
                {
                    title: "",
                    description: "",
                    year: "",
                },
            ],
            projects: [
                {
                    title: "",
                    description: "",
                    projectLink: "",
                },
            ],
        }
    )

    return <AppContext.Provider value={{ user, setUser }}>
        {children}
    </AppContext.Provider>
}

export default ParentContext
import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const ParentContext = ({ children }) => {
    const [user, setUser] = useState(
        {
            "fullName": "",
            "phoneNumber": "",
            "role": "",
            "emailAddress": "",
            "bio": "",
            "resume": "",
            "skills": [],
            "socialLinks": {
                "website": "",
                "facebook": "",
                "twitter": "",
                "instagram": "",
                "linkedin": "",
                "github": "",
                "behance": "",
                "dribbble": ""
            },
            "education": {
                "degree": "",
                "fieldOfStudy": "",
                "institution": "",
                "graduationYear": ""
            },
            "workExperience": [
                {
                    "jobTitle": "",
                    "organization": "",
                    "duration": "",
                    "description": ""
                }
            ],
            "achievements": [
                {
                    "title": "",
                    "description": "",
                    "year": ""
                }
            ],
            "projects": [
                {
                    "name": "",
                    "description": "",
                    "imgLink": "",
                    "stack": [],
                    "SourceCode": "",
                    "livePreview": ""
                }
            ]
        }
    )

    return <AppContext.Provider value={{ user, setUser }}>
        {children}
    </AppContext.Provider>
}

export default ParentContext
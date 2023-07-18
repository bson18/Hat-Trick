import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { thunkCreatePost } from "../../../store/post"

const CreatePost = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [sections, setSections] = useState([])
    const [validationErrors, setValidationErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const formRef = useRef(null)

    const handleSectionChange = (index, field, value) => {
        const updatedSections = [...sections]
        updatedSections[index][field] = value
        setSections(updatedSections)
    }

    const handleImageChange = (index, value) => {
        const updatedSections = [...sections]
        updatedSections[index].image = value
        setSections(updatedSections)
    }

    const handleAddSection = () => {
        setSections([...sections, { section_heading: '', section: '', image: '', order: '' }])
    }

    const handleRemoveSection = (index) => {
        const updatedSections = [...sections]
        updatedSections.splice(index, 1)
        setSections(updatedSections)
    }

    const validation = () => {
        const errors = {}

        sections.forEach((section, index) => {
            if (section.section && !section.image) {
                errors[`section${index + 1}`] = 'Must have an image for this section'
            }
        })
        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (!validation()) return

        setIsLoading(true)

        const formData = new FormData(formRef.current)
        formData.append('title', e.target.elements.title.value)

        sections.forEach((section, index) => {
            formData.append(`section_${index + 1}_section_heading`, section.section_heading)
            formData.append(`section_${index + 1}_section`, section.section)
            formData.append(`section_${index + 1}_image`, section.image)
        })
        formData.append('num_sections', sections.length)
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }
        let post = await dispatch(thunkCreatePost(formData))

        if (post) {
            history.push(`/${post.id}`)
        }

        setIsLoading(false)
    }

    return (
        <div>
            <form ref={formRef} onSubmit={handleSubmit} encType='multipart/form-data'>
                <label htmlFor="title">Title</label>
                <textarea id="title" name="title" required />

                {sections.map((section, index) => (
                    <div key={index}>
                        <label htmlFor={`section_${index + 1}_section_heading`}>
                            Section Heading {index + 1}
                        </label>
                        <textarea
                            id={`section_${index + 1}_section_heading`}
                            name={`section_${index + 1}_section_heading`}
                            type="text"
                            value={section.section_heading}
                            onChange={(e) =>
                                handleSectionChange(index, "section_heading", e.target.value)
                            }
                        />
                        <label htmlFor={`section_${index + 1}_section`}>
                            Section Content {index + 1}
                        </label>
                        <textarea
                            id={`section_${index + 1}_section`}
                            name={`section_${index + 1}_section`}
                            type="text"
                            value={section.section}
                            onChange={(e) =>
                                handleSectionChange(index, "section", e.target.value)
                            }
                        />
                        {validationErrors[`section_${index + 1}`] && (
                            <span>{validationErrors[`section_${index + 1}`]}</span>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                handleImageChange(index, e.target.files[0])
                            }
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveSection(index)}
                        >
                            Remove Section
                        </button>
                    </div>
                ))}

                <button type="button" onClick={handleAddSection}>
                    Add Section
                </button>
                <button type="submit">{isLoading ? "Posting" : "Post Article"}</button>
            </form>
        </div>
    );
};

export default CreatePost

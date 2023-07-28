import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { thunkCreatePost } from "../../../store/post"
import "./CreatePost.css"

const CreatePost = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    if (!user) history.push('/')

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
        if (!validation() || sections.length === 0) {
            if (sections.length === 0) setValidationErrors(prevErrors => ({ ...prevErrors, sectionsError: 'Must have at least one section' }))
            return
        }

        setIsLoading(true)

        const formData = new FormData(formRef.current)
        formData.append('title', e.target.elements.title.value)

        sections.forEach((section, index) => {
            formData.append(`section_${index + 1}_section_heading`, section.section_heading)
            formData.append(`section_${index + 1}_section`, section.section)
            formData.append(`section_${index + 1}_image`, section.image)
        })
        formData.append('num_sections', sections.length)
        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }
        let post = await dispatch(thunkCreatePost(formData))

        if (post) {
            history.push(`/${post.id}`)
        }

        setIsLoading(false)
    }

    return (
        <div>
            <form className="post-form" ref={formRef} onSubmit={handleSubmit} encType='multipart/form-data'>
                <label htmlFor="title">Title</label>
                <textarea id="title" name="title" required />
                <h3 className="create-h3">Click the Add Section button to add more sections to your post</h3>
                <h4 className="middle-h4">Each section requires:</h4>
                <h4 className="create-h4">a heading setence, content paragraph, and a related image</h4>
                {validationErrors.sectionsError && (<span>{validationErrors.sectionsError}</span>)}
                {sections.map((section, index) => (
                    <div className="section-form" key={index}>
                        <label htmlFor={`section_${index + 1}_section_heading`}>
                            Section Heading {index + 1}
                        </label>
                        <textarea
                            className="section-heading"
                            id={`section_${index + 1}_section_heading`}
                            name={`section_${index + 1}_section_heading`}
                            type="text"
                            required
                            value={section.section_heading}
                            onChange={(e) =>
                                handleSectionChange(index, "section_heading", e.target.value)
                            }
                        />
                        <label htmlFor={`section_${index + 1}_section`}>
                            Section Content {index + 1}
                        </label>
                        <textarea
                            className="section-content"
                            id={`section_${index + 1}_section`}
                            name={`section_${index + 1}_section`}
                            type="text"
                            required
                            value={section.section}
                            onChange={(e) =>
                                handleSectionChange(index, "section", e.target.value)
                            }
                        />
                        {validationErrors[`section_${index + 1}`] && (
                            <span>{validationErrors[`section_${index + 1}`]}</span>
                        )}
                        <input
                            className="image-upload"
                            type="file"
                            required
                            accept="image/*"
                            onChange={(e) =>
                                handleImageChange(index, e.target.files[0])
                            }
                        />
                        <button
                            className="remove-btn"
                            type="button"
                            onClick={() => handleRemoveSection(index)}
                        >
                            REMOVE SECTION
                        </button>
                    </div>
                ))}

                <button className="add-btn" type="button" onClick={handleAddSection}>
                    ADD SECTION
                </button>
                <button className="submit-post-btn" type="submit">{isLoading ? "POSTING" : "POST ARTICLE"}</button>
            </form>
        </div>
    );
};

export default CreatePost

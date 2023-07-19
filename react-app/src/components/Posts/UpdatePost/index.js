import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { thunkUpdatePost } from "../../../store/post"

const UpdatePost = () => {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const post = useSelector(state => state.posts.singlePost)

    const [title, setTitle] = useState('')
    const [sections, setSections] = useState([])
    const [validationErrors, setValidationErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const formRef = useRef(null)

    useEffect(() => {
        let isMounted = true

        if (post && isMounted) {
            setTitle(post.title)
            setSections(post.sections)
        }

        return () => {
            isMounted = false
        }
    }, [post])

    const handleSectionChange = (index, field, value) => {
        const updatedSections = [...sections]
        updatedSections[index][field] = value
        setSections(updatedSections)
    }

    // const handleImageChange = (index, value) => {
    //     const updatedSections = [...sections]
    //     updatedSections[index].image = value
    //     setSections(updatedSections)
    // }

    // const validation = () => {
    //     const errors = {}

    //     sections.forEach((section, index) => {
    //         if (section.section && !section.image) {
    //             errors[`section${index + 1}`] = 'Must have an image for this section'
    //         }
    //     })
    //     setValidationErrors(errors)
    //     return Object.keys(errors).length === 0
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!validation()) return
        setIsLoading(true)

        const formData = new FormData(formRef.current);
        formData.append("title", title);
        sections.forEach((section, index) => {
            formData.append(`section_${section.id}_section_heading`, section.section_heading);
            formData.append(`section_${section.id}_section`, section.section);
            // if (section.imageFile) {
            //     formData.append(`section_${index + 1}_image`, section.imageFile);
            // }
        });
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }

        await dispatch(thunkUpdatePost(postId, formData));
        history.push(`/${postId}`);
        setIsLoading(false)
    }

    if (!post) return null

    return (
        <div>
            <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="title">Title</label>
                <textarea id="title" name="title" defaultValue={title} required />

                {sections.map((section, index) => (
                    <div key={index}>
                        <label htmlFor={`section_${index + 1}_section_heading`}>Section Heading {index + 1}</label>
                        <textarea
                            id={`section_${index + 1}_section_heading`}
                            name={`section_${index + 1}_section_heading`}
                            type="text"
                            required
                            defaultValue={section.section_heading}
                            onChange={(e) => handleSectionChange(index, "section_heading", e.target.value)}
                        />

                        <label htmlFor={`section_${index + 1}_section`}>Section Content {index + 1}</label>
                        <textarea
                            id={`section_${index + 1}_section`}
                            name={`section_${index + 1}_section`}
                            type="text"
                            required
                            defaultValue={section.section}
                            onChange={(e) => handleSectionChange(index, "section", e.target.value)}
                        />

                        {/* {validationErrors[`section_${index + 1}`] && (
                            <span>{validationErrors[`section_${index + 1}`]}</span>
                        )} */}
                    </div>
                ))}

                <button type="submit">{isLoading ? "Updating" : "Update Post"}</button>
            </form>
        </div>
    );
};

export default UpdatePost

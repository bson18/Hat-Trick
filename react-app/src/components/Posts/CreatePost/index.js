import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const CreatePost = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [section1, setSection1] = useState('')
    const [section2, setSection2] = useState('')
    const [section3, setSection3] = useState('')
    const [section4, setSection4] = useState('')
    const [section5, setSection5] = useState('')
    const [img1, setImg1] = useState('')
    const [img2, setImg2] = useState('')
    const [img3, setImg3] = useState('')
    const [img4, setImg4] = useState('')
    const [img5, setImg5] = useState('')
    const [validationErrors, setValidationErrors] = useState({})

    const validation = () => {
        const errors = {}

        if (section1 && !img1) errors.section1 = 'Must have an image for this section'
        if (section2 && !img2) errors.section2 = 'Must have an image for this section'
        if (section3 && !img3) errors.section3 = 'Must have an image for this section'
        if (section4 && !img4) errors.section4 = 'Must have an image for this section'
        if (section5 && !img5) errors.section5 = 'Must have an image for this section'
        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }


    return (
        <div>

            <button>Post Article</button>
        </div>
    )
}

export default CreatePost

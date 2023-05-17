import { useFormik } from 'formik'
import React from 'react';
import * as Yup from 'yup';


function FormikSample() {

    const addProductValidationSchema = Yup.object().shape({
        name: Yup.string()
            .required("This field cannot be empty").max(50, 'You cannot add more than 50 characters'),
        mail: Yup.string()
            .required("This field cannot be empty")
            .email("Invalid email address")
            .test('code-email', 'Email address must have @code.edu.az domain', value => {
                if (value) {
                    return value.endsWith('@code.edu.az');
                }
                return true;
            }),
        gender: Yup.string()
            .required("You need to specify your gender"),
        password: Yup.string()
            .required("You need to create a password")
            .min(8, "The length of the password must be at least 8 characters")
            .test('first-letter-uppercase', 'The first letter of the password must be capitalized', value => {
                if (value) {
                    const firstLetter = value[0];
                    return firstLetter === firstLetter.toUpperCase();
                }
                return true;
            }),

        confirmPassword: Yup.string()
            .required("You need to confirm your password")
            .oneOf([Yup.ref('password')], 'Passwords do not match'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            mail: '',
            gender: 'female',
            password: '',
            confirmPassword: ''
        },
        validationSchema: addProductValidationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            alert('User registered successfully');
            resetForm();
        }
    })

    return (<>
        <form onSubmit={formik.handleSubmit}>
            <>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <br />
                    <input className="form-input" id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
                    {formik.touched.name && formik.errors?.name && <p style={{ color: 'red' }}>{formik.errors.name}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="mail" className="form-label">Mail</label>
                    <br />
                    <input className="form-input" id="mail" name="mail" type="text" onChange={formik.handleChange} value={formik.values.mail} />
                    {formik.touched.mail && formik.errors?.mail && <p style={{ color: 'red' }}>{formik.errors.mail}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <br />
                    <div className="radio-group">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formik.values.gender === 'female'}
                                onChange={formik.handleChange}
                            />
                            <span className="radio-text">Female</span>
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formik.values.gender === 'male'}
                                onChange={formik.handleChange}
                            />
                            <span className="radio-text">Male</span>
                        </label>
                    </div>
                    {formik.touched.gender && formik.errors?.gender && <p style={{ color: 'red' }}>{formik.errors.gender}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Passowrd</label>
                    <br />
                    <input className="form-input" id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} />
                    {formik.touched.password && formik.errors?.password && <p style={{ color: 'red' }}>{formik.errors.password}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Passowrd</label>
                    <br />
                    <input className="form-input" id="confirmPassword" name="confirmPassword" type="password" onChange={formik.handleChange} value={formik.values.confirmPassword} />
                    {formik.touched.confirmPassword && formik.errors?.confirmPassword && <p style={{ color: 'red' }}>{formik.errors.confirmPassword}</p>}
                </div>
                <div>
                    <button className="form-button" type="submit">Register</button>
                </div>
            </>

        </form>



    </>)
}

export default FormikSample
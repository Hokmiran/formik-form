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
        onSubmit: values => {
            console.log(values);
        }
    })

    return (<>
        <form onSubmit={formik.handleSubmit}>
            <>
                <div>
                    <label htmlFor="name">Name</label>
                    <br />
                    <br />
                    <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
                    <p style={{ color: 'red' }}>{formik.errors?.name}</p>
                    <br />
                    <br />
                </div>
                <div>
                    <label htmlFor="mail">Mail</label>
                    <br />
                    <br />
                    <input id="mail" name="mail" type="text" onChange={formik.handleChange} value={formik.values.mail} />
                    <p style={{ color: 'red' }}>{formik.errors?.mail}</p>
                    <br />
                    <br />
                </div>
                <div>
                    <label htmlFor="gender">Gender</label>
                    <br />
                    <br />
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formik.values.gender === 'female'}
                            onChange={formik.handleChange}
                        />
                        Female
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formik.values.gender === 'male'}
                            onChange={formik.handleChange}
                        />
                        Male
                    </label>

                    <p style={{ color: 'red' }}>{formik.errors?.gender}</p>
                    <br />
                    <br />
                </div>
                <div>
                    <label htmlFor="password">Passowrd</label>
                    <br />
                    <br />
                    <input id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} />
                    <p style={{ color: 'red' }}>{formik.errors?.password}</p>
                    <br />
                    <br />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Passowrd</label>
                    <br />
                    <br />
                    <input id="confirmPassword" name="confirmPassword" type="password" onChange={formik.handleChange} value={formik.values.confirmPassword} />
                    <p style={{ color: 'red' }}>{formik.errors?.confirmPassword}</p>
                    <br />
                    <br />
                </div>
                <div>
                    <button style={{ cursor: 'pointer' }} type="submit">Submit</button>
                </div>
            </>

        </form>



    </>)
}

export default FormikSample
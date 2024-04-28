import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    categoryName: Yup.string().max(25, 'Max 25 characters').required('Category name is required!'),
    categoryDescription: Yup.string().max(100, 'Max 100 characters')
})

const todoSchema = Yup.object().shape({
    name: Yup.string().max(100, 'Max 100 characters').required(),
    categoryId: Yup.number().required()
})
export {catSchema, todoSchema}
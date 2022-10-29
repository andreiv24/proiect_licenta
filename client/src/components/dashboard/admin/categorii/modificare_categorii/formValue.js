import * as Yup from 'yup';

export const formValue = {
    denumire: ''
}

export const getValueToEdit = (categorie) => {
    return {
        denumire: categorie.denumire,
    }
}

export const validation = () => (
    Yup.object({
        denumire: Yup.string().required('Denumirea categoriei e necesară')
    })
)